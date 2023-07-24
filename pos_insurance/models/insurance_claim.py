from odoo import models, fields, api

class insurance_claim(models.Model):
    _name = 'insurance.claim'
    _description = 'Insurance Claim'

    partner_id = fields.Many2one('res.partner',string="Customer")
    insurance_policy_number = fields.Char(string='Insurance Policy Number')
    product_id = fields.Many2one('product.product', string='Product')
    order_id = fields.Many2one('pos.order',string="Order")
