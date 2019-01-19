import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
    title(i) {
        return `Exercise ${i+1}`
    },
    description(i) {
        return `Exercise ${i+1} description`
    },
    type: 'match'
});
