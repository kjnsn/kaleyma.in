import Promise from "bluebird";

export default class API {
    constructor(address) {
        this.address = address;

        this.getPosts = this.getPosts.bind(this);
    }

    getPosts() {
        return fetch(this.address).then(r => r.json());
    }
}