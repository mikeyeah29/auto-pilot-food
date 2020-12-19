import Model from '../model.js';

class StockItem extends Model {

	constructor() {
		super('stock_item', {
			name: '',
			area: 'Fresh'
		});
	}

}

export default new StockItem();