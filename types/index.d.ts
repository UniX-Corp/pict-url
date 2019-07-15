declare module 'pict-url' {

    //
    //#region Interface
    //

    /**
     * Image Interface
     */
    export interface Image {
        /**
         * Represents the returned image's url
         * @returns {string}
         */
        url? : string;
    }

    export interface Provider {
        getUrl(options : Client): Promise<string>;
        format(response : Response,options: ProviderOptions) : Image;
    }
    
    /**
     * Client Options Interface
     */
    export interface ClientOptions {
        providers?: Map<String,Provider>;
    }

    // Define the options you pass to the provider
    export interface ProviderOptions{
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
        getImage (provider : string,options = undefined) : Promise<Image>;
    }

}