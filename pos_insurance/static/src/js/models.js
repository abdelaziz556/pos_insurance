odoo.define("pos_insurance.models", function (require) {
    "use strict";

    var {Order,Orderline} = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');

    const InsuranceOrderline = (Orderline) => class InsuranceOrderline extends Orderline {
        constructor() {
            super(...arguments);
            this.is_insurance_covered = this.is_insurance_covered || false;
        }
        set_order_line_is_insurance_covered(is_insurance_covered){
        	this.is_insurance_covered = is_insurance_covered
        }
        get_order_line_is_insurance_covered(){
        	return this.is_insurance_covered;
        }
        export_as_JSON() {
            var json = super.export_as_JSON()
            json.is_insurance_covered = this.get_order_line_is_insurance_covered() || false;
            return json;
        }
        export_for_printing() {
            var self = this;
            var order_line = super.export_for_printing()
            var new_val = {
            	is_insurance_covered: this.get_order_line_is_insurance_covered() || false,
            };
            $.extend(order_line, new_val);
            return order_line;
        }
}
    Registries.Model.extend(Orderline, InsuranceOrderline);

    const OrderPolicyNumber = (Order) => class OrderPolicyNumber extends Order {
        constructor() {
            super(...arguments);
            this.policy_number = false;
        }
        set_order_policy_number(policy_number){
        	this.policy_number = policy_number
        }
        get_order_policy_number(){
        	return this.policy_number;
        }
        export_as_JSON() {
            var json = super.export_as_JSON()
            json.policy_number = this.get_order_policy_number() || null;

            return json;
        }
        export_for_printing() {
            var self = this;
            var orders = super.export_for_printing()
            var new_val = {
            	policy_number: this.get_order_policy_number() || false,
            };
            $.extend(orders, new_val);
            return orders;
        }
    };
    Registries.Model.extend(Order, OrderPolicyNumber);

});