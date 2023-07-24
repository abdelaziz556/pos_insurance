odoo.define('pos_insurance.ProductScreen', function (require) {
    'use strict';

    var ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');
    const NumberBuffer = require('point_of_sale.NumberBuffer');
    const core = require("web.core");
    const _t = core._t;

    const ProductScreenExtend = (ProductScreen) =>
        class extends ProductScreen {

            constructor() {
                super(...arguments);
            }

            async _clickProduct(event) {
                // Check if a customer is set for the current order.
                if (!this.env.pos.get_order().get_partner()) {
                    const result = await this.showPopup("ConfirmPopup", {
                        title: _t("An anonymous order cannot be confirmed"),
                        body: _t("Please select a customer for this order."),
                    });
                    if (result.confirmed) {
                        return false;
                    }
                    return false;
                }
                const product = event.detail;

                // If there is no current order, add a new one.
                if (!this.currentOrder) {
                    this.env.pos.add_new_order();
                }

                // Get product options. If no options are returned, end the function.
                const options = await this._getAddProductOptions(product);
                if (!options) return;

                // If the product is covered by insurance, handle the insurance process.
                if (product.is_insurance_covered) {
                    const { confirmed, payload: results } = await this.showPopup('PopUpSelectionInsurance');

                    // If the popup was confirmed, add the product to the order with a price of 0.
                    if (confirmed) {
                        this.currentOrder.add_product(product, options);
                        this.currentOrder.selected_orderline.set_order_line_is_insurance_covered(results);

                        if (results) {
                            this.currentOrder.selected_orderline.set_unit_price(0);
                        }

                        NumberBuffer.reset();
                    }
                } else {
                    // If the product is not covered by insurance, add it to the order as usual.
                    super._clickProduct(event);
                }
            };
            async _onClickPay() {
                // Get the current order.
                const currentOrder = this.env.pos.get_order();

                // If any of the order lines are covered by insurance,
                // show the 'PopUpInsurancePolicyNumber' popup.
                if (currentOrder.orderlines.some(line => line.is_insurance_covered)) {
                    const {confirmed, payload: results} = await this.showPopup('PopUpInsurancePolicyNumber');

                    // If the popup is confirmed (the insurance policy number is entered),
                    // set the policy number on the current order.
                    if (confirmed) {
                        currentOrder.set_order_policy_number(results);
                    }
                }

                // Whether or not the order has insurance-covered lines,
                // always navigate to the 'PaymentScreen' afterwards.
                this.showScreen('PaymentScreen');
            }
    }
    Registries.Component.extend(ProductScreen, ProductScreenExtend);

    return ProductScreenExtend;
});
