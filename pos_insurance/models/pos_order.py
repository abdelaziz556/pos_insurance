from odoo import fields, models, api
    
class PosOrder(models.Model):
    _inherit = 'pos.order'
    
    policy_number = fields.Char(string="Policy Number")
    
    @api.model
    def _order_fields(self, ui_order):
        res = super(PosOrder, self)._order_fields(ui_order)
        res['policy_number'] = ui_order.get('policy_number', False)
        return res
    