from odoo import models, fields, api




class ProductTemplate(models.Model):
    _inherit = 'product.template'

    is_insurance_covered = fields.Boolean('Is Insurance Covered', default=False)
    