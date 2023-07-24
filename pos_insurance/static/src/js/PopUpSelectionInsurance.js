odoo.define('pos_insurance.PopUpSelectionInsurance', function(require){
	'use strict';

	const Popup = require('point_of_sale.ConfirmPopup');
	const Registries = require('point_of_sale.Registries');
	const PosComponent = require('point_of_sale.PosComponent');
	const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');

	class PopUpSelectionInsurance extends AbstractAwaitablePopup {

		constructor() {
            super(...arguments);
        }
        add_insurance(ev) {
            // Prevent the event from bubbling up and performing the default action.
            ev.stopPropagation();
            ev.preventDefault();

            // Resolve the popup with a confirmation and a payload of true.
            this.props.resolve({ confirmed: true, payload: true });

            // Call the parent class's confirm method.
            super.confirm();
        }

        skip_insurance(ev) {
            // Prevent the event from bubbling up and performing the default action.
            ev.stopPropagation();
            ev.preventDefault();

            // Resolve the popup with a confirmation and a payload of false.
            this.props.resolve({ confirmed: true, payload: false });

            // Call the parent class's confirm method.
            super.confirm();
        }
	};

	PopUpSelectionInsurance.template = 'PopUpSelectionInsurance';

	Registries.Component.add(PopUpSelectionInsurance);

	return PopUpSelectionInsurance;

});