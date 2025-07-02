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
