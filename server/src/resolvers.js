const { Product, User, Favorite, Watch } = require("./models/models");


const countOccurences = (arr) => {
    var counts = {};

    for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    return counts;
}

// This gets a product from ID and thows an error if it can't be found
const getProductById = async (id) => {
    const product = await Product.findById(id);
    if(!product) {
        throw new Error("Product with the id: '" + id + "' not found.");
    }
    return product;
}

// This gets a user from ID and thows an error if it can't be found
const getUserById = async (id) => {
    const user = await User.findById(id);
    if(!user) {
        throw new Error("User with the id '" + id + "' not found. Try deleting your token.");
    }
    return user;
}

// This adds a watch to the database, and updates all the references
const addWatch = async (productId, userId) => {

    const watch = await new Watch({ product: productId, user: userId});
    
    const user = await getUserById(userId);
    user.watches.push(watch); user.save();

    const product = await getProductById(productId);
    product.watches.push(watch); product.save();    
    
    watch.save();
}

// These are the possible queries the backend allows you to call
const resolvers = {

    Query: {


        // A query for all products
        products: async (obj, { skip, limit, search, filters, sort }, { userId }, info) => {
            
            const checkBoxFilters = ["filterType", "filterCountry", "vintage", "packaging", "eco", "kosher", "bioDynamic", "green_packaging", "gluten"];
            const numberFilters = ["volume", "price", "pricePerLiter", "alcohol", "tannins", "fullness", "freshness", "sweetness", "bitterness"];

            // If isFavorited filter is true, this will be true.
            let favorites = null;


            if(filters) {

                // Sets "favorites" to be the querying user's favorites 
                if(filters.isFavorited) {
                    favorites = await Favorite.find({user: userId});
                }

                // Formats all the filters to either be a checkbox filter or a range-filter. Using mongoose methods for this
                filters = Object.fromEntries(Object.entries(filters).map(([key, value]) => {
                    if (checkBoxFilters.indexOf(key) !== -1) {

                        // checks if the value is any of the values in the "value" list
                        return [key, {$in: value}];
                    }
                    if (numberFilters.indexOf(key) !== -1) {

                        // checks if the value is between one of the values in the "value" list. +0.001 and -0.001 to make it inclusive.
                        return [key, {$gt: value[0]-0.001, $lt: value[1]+0.001}];
                    }
                    return {};

                }));
            }
 

            const query = { ...filters };


            // Checks if the product is favorited by the querying user.
            if(favorites) {
                query.favorites = { $in: favorites }
            };


            // Searches for the name to match parts of the searchword, using regex
            // Documentation on MongoDB-regex: www.tiny.cc/MongoDBregex
            if(search) { 
                query.name = { $regex: search, $options: "i" };
            };


            // The actual query, where it filters on the filter-object that we've declared earlier. Sorts, skips and limits based on parameters in the query. Only fetching specific fields.
            const products = Product.find(query)
            .select("img name volume type country price alcohol")
            .sort(sort)
            .skip(skip) 
            .limit(limit);


            // counts the amount of documents
            const totalCount = Product.find(query).countDocuments();


            return { products, totalCount }
        },


        
        // A query for a specific product
        product: async (obj, { id }, { userId }) => {

            const product = await getProductById(id);
            
            // Adds a watch-record to the database to track watches
            await addWatch(id, userId);

            return product
        },

        watches: async () => {

            const watches = await Watch.find().populate("product");
        
            // Counts the occurences of each country and formats to ["Country Name": Amount]
            const countries = Object.entries(countOccurences(watches.map(watch => watch.product.filterCountry)));

            const types = Object.entries(countOccurences(watches.map(watch => watch.product.filterType)));

            
            watches.countries = countries;
            watches.types = types;

            return watches;
        },
    },
    
    Mutation: {

        // Adds or removes favorite
        toggleFavorite: async (obj, { productId }, { userId }) => {

            let favorite = await Favorite.findOne({ user: userId, product: productId });

            // If the favorite connection already exists, remove it
            if(favorite) {
                const user = await getUserById(userId);
                const product = await getProductById(productId);
                
                user.favorites.remove(favorite); user.save();
                product.favorites.remove(favorite); product.save();
                favorite.remove();
                return null;
            }


            // If the favorite connection doesn't exist, add one
            favorite = await new Favorite({ user: userId, product: productId});

            const user = await getUserById(userId);
            const product = await getProductById(productId);
            
            user.favorites.push(favorite); user.save();
            product.favorites.push(favorite); product.save();
            await favorite.save();

            return favorite;
        }
    },

    
    // The functions below helps with relations, makes you able to request for example: product > favorites > user > favorites 


    Product: {
        watches: (product) => Watch.find({ product: product.id }),
        favorites: (product) => Favorite.find({ product: product.id }),
        isFavorited: async (product, args, { userId }) => {

            // If there exists a favorite object with the requested product and the querying user, return true
            const favorite = await Favorite.findOne({ product: product.id, user: userId });
            return favorite !== null;
        }
    },

    User: {
        watches: (user) => Watch.find({ user: user.id }),
        favorites: (user) => Favorite.find({ user: user.id }),
    },

    Watch: {
        user: (watch) => User.findById(watch.user),
        product: (watch) => Product.findById(watch.product),
    },

    WatchesResult: {
        watches: () => Watch.find()
    },

    Favorite: {
        user: (favorite) => User.findById(favorite.user),
        product: (favorite) => Product.findById(favorite.product),
    }
};

module.exports = resolvers;