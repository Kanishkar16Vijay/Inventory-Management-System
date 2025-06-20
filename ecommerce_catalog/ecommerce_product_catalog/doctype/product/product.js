// Copyright (c) 2025, Kanishkar and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Product", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on("Product", {
    refresh: function(frm) {
        frm.add_custom_button('Create Transaction', () => {
            frappe.new_doc('Transactions', {
                product: frm.doc.name
            });
        });
    }
});
