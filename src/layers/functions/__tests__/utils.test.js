const {toLowerCase} = require('../utils');

describe('Test all utils function', function () {
    it('should convert any object keys to lower case', async () => {
        let targetObject = {
            Key1: 'value',
            xKey2: 'foobar',
            ALL_CAPS: 'john doe'
        }

        const exceptedObject = {
            key1: 'value',
            xkey2: 'foobar',
            all_caps: 'john doe'
        }

        const resultObject = toLowerCase(targetObject)

        expect(resultObject).toEqual(exceptedObject);
    })
});
