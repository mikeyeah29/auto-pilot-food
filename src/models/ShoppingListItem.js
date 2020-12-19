import Model from '../model.js';

class ShoppingListItem extends Model {

	constructor() {
		super('sl_item', {
			name: ''
		});
	}

}

export default new ShoppingListItem();