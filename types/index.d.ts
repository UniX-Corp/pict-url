declare module 'pict-url' {

    //
    //#region Interface
    //

    /**
     * Image Interface
     */
    export interface Image {
        /**
         * Represents the image's url
         * @returns {string}
         */
        url? : string;
    }

    /**
     * This Interface is an object which keys and values depends on the CategoriesURL you have set
     */
    export interface CategoriesURLResponse {
    }

    /**
     * Provider Options Interface
     */
    export interface ProviderOptions {
        /**
         * Represents the url for getting random links by category / tag
         * Use {{category}} to choose the category given in the getImage's Promise
         */
        categoriesURL? : string;

        /**
         * Represents the url for getting the randomly picked link
         * See the default value on GitHub for more details
         */
        urlGetter? : (response : CategoriesURLResponse) => string;
    }

    /**
     * Request Options Interface
     */
    export interface RequestOptions {
        /**
         * Represents the NodeJS http(s) request options used while the categoriesURL's get
         */
        categoriesURL? : Object;

        /**
         * Represents the NodeJS http(s) request options used while urlGetter parses the url.
         * Not used by default, but can be implemented on your own Provider.
         */
        urlGetter? : Object;
    }

    //
    //#region Classes
    //

    /**
     * Client Instance
     */
    export class Client {
        /**
         * Create a new Client instance
         * @param {Provider} provider The provider used by the Client instance
         * @returns {Client} New Client Instance
         */
        constructor (provider : Provider, requestOptions : RequestOptions);

        /**
         * Get image from a specified category
         * @param {string} cat Category
         * @returns {Promise<Image>} A Promise including the Image
         */
        getImage (category : string) : Promise<Image>;

        /**
         * Change the Client's instance Provider in real time
         * @param {Provider} provider The new provider to be used by the Client instance
         */
        set provider () : Provider;
    }

    /**
     * Provider Instance
     */
    export class Provider {
        /**
         * Create a new Provider instance
         * @returns {Provider} New Provider Instance
         */
        constructor (options : ProviderOptions);

        /**
         * Get Imgur as a Provider
         * @returns {Provider} Imgur as Provider
         */
        static Imgur : Provider;
    }

}