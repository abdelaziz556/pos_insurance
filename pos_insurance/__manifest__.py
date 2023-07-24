# -*- coding: utf-8 -*-
{
    # App information
    'name': 'POS Insurance',
    'version': '16.0',
    'category': 'Point of Sale',
    'sequence': 1,

    # Dependencies
    'depends': ['point_of_sale'],
    # Data
    'data': [
        # Secuirty
        'security/ir.model.access.csv',
        # Views
        'views/product_template.xml',
        'views/insurance_claim.xml',
    ],
    # Assets
    'assets': {
        'point_of_sale.assets': [
            'pos_insurance/static/src/js/models.js',
            'pos_insurance/static/src/js/PopUpSelectionInsurance.js',
            'pos_insurance/static/src/js/PopUpInsurancePolicyNumber.js',
            'pos_insurance/static/src/js/ProductScreen.js',
            'pos_insurance/static/src/xml/**/*',
            'pos_insurance/static/src/css/*',
        ],
    },

    # Technical
    'installable': True,
    'application': True,
}
