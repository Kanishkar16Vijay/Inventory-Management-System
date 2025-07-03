frappe.ui.form.on("Transaction", {
    after_save: function(frm) {
        localStorage.removeItem("member_id");
    }
});
