from odoo import api, models, fields,_

class PosOrderLine(models.Model):
    _inherit = 'pos.order.line'


    is_insurance_covered = fields.Boolean('Is Insurance Covered', default=False)


    def _export_for_ui(self, orderline):
        result = super()._export_for_ui(orderline)
        result['is_insurance_covered'] = orderline.is_insurance_covered or False
        return result


    def _prepare_insurance_claim_vals(self, order_line):
        """
        Helper method to prepare the values for creating an insurance claim record.

        :param order_line: Recordset of the order line for which to prepare the insurance claim values.
        :return: Dictionary containing the prepared values.
        """
        return {
            'partner_id': order_line.order_id.partner_id.id,
            'insurance_policy_number': order_line.order_id.policy_number,
            'product_id': order_line.product_id.id,
            'order_id': order_line.order_id.id
        }

    def _create_insurance_claim(self, order_line):
        """
        Helper method to create an insurance claim record.

        :param order_line: Recordset of the order line for which to create the insurance claim.
        """
        insurance_claim_vals = self._prepare_insurance_claim_vals(order_line)
        self.env['insurance.claim'].create(insurance_claim_vals)

    @api.model_create_multi
    def create(self, vals_list):
        """
        Overridden create method to handle the creation of insurance claim records when
        an order line with an insurance-covered product is created.

        For each order line, this method checks if the product is covered by insurance.
        If it is, an insurance claim record is automatically created with the relevant details
        including the partner ID, insurance policy number, product ID, and order ID.

        :param vals_list: List of dictionaries containing the field values for new order lines.
        :return: Recordset of the created pos.order.line records.
        """
        pos_order_line_ids = super().create(vals_list)
        for pos_order_line in pos_order_line_ids:
            if pos_order_line.is_insurance_covered:
                self._create_insurance_claim(pos_order_line)

        return pos_order_line_ids
