declare module 'unixtruc' {

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
     * Client Options Interface
     */
    export interface ClientOptions {
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

    //
    //#region Classes
    //

    /**
     * Client Instance
     */
    export class Client {
        /**
         * Create a new Client instance
         * @returns {Client}
         */
        constructor (options : ClientOptions);

        /**
         * Get image from a specified Imgur category
         * @param {string} cat Imgur category
         * @returns {Promise<Image>}
         */
        getImage (category : string) : Promise<Image>;
    }

}