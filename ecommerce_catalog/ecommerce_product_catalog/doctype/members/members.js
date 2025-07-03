frappe.ui.form.on('Members', {
    refresh: function(frm) {
        frm.add_custom_button("Go to Product List", function () {
            // Store data in localStorage
            localStorage.setItem('member_id', frm.doc.name); // or any field like frm.doc.email

            // Then navigate to Product List
            frappe.set_route('List', 'Product');
        });
    }
});

frappe.ui.form.on("Members", {
    refresh: function(frm) {
        if (frm.doc.cart_items && frm.doc.cart_items.length > 0) {
            frm.add_custom_button("Checkout Cart", () => {
                let total_price = 0;
                for (let item of frm.doc.cart_items) {
                    total_price += item.total; // Assuming each item has a 'total' field
                }
                frappe.new_doc('Transaction', {
                    member: frm.doc.name,
                    product_table: frm.doc.cart_items,
                    total_items: frm.doc.cart_items.length,
                    price: total_price
                });
            });
        }
    }
});

