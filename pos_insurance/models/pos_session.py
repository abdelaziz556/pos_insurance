from odoo import api, models, fields, tools

class PosSession(models.Model):
    _inherit = 'pos.session'


    def _loader_params_product_product(self):

        result = super()._loader_params_product_product()
        result['search_params']['fields'].extend(['is_insurance_covered'])
        return result
