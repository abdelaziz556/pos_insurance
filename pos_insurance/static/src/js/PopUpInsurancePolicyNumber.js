odoo.define('pos_insurance.PopUpInsurancePolicyNumber', function(require){
	'use strict';

	const Popup = require('point_of_sale.ConfirmPopup');
	const Registries = require('point_of_sale.Registries');
	const PosComponent = require('point_of_sale.PosComponent');
	const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');

	class PopUpInsurancePolicyNumber extends AbstractAwaitablePopup {

		constructor() {
            super(...arguments);
        }
        confirm(ev) {
            // Prevent the event from bubbling up and performing the default action.
            ev.stopPropagation();
            ev.preventDefault();

            // Retrieve the policy number from the input with id 'customer_policy_number'.
            const policyNumber = $("#customer_policy_number").val();

            // If no policy number is entered, show an error popup and end the function.
            if (!policyNumber) {
                return this.showPopup('ErrorPopup', {
                    title: this.env._t('Error'),
                    body: this.env._t('Must Enter Policy Number For Customer')
                });
            }

            // If a policy number is entered, resolve the popup with the entered policy number.
            this.props.resolve({ confirmed: true, payload: policyNumber });

            // Call the parent class's confirm method.
            super.confirm();
        }
	};

	PopUpInsurancePolicyNumber.template = 'PopUpInsurancePolicyNumber';

	Registries.Component.add(PopUpInsurancePolicyNumber);

	return PopUpInsurancePolicyNumber;

});