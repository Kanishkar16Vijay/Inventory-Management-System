frappe.ui.form.on("Product", {
    refresh: function (frm) {

        const member_id = localStorage.getItem("member_id");
        console.log("Fetched from localStorage:", member_id);

        if (member_id) {
            frm.add_custom_button('Add to Cart', async () => {
                try {
                    // 1. Fetch Member document
                    const member = await frappe.db.get_doc('Members', member_id);

                    // 2. Ensure cart_items array exists
                    member.cart_items = member.cart_items || [];

                    // 3. Check if product already exists in cart
                    let product_found = false;
                    for (let item of member.cart_items) {
                        if (item.product === frm.doc.name) {
                            item.quantity += 1;
                            item.total = item.quantity * frm.doc.price; // Update total
                            product_found = true;
                            break; // found, break out of loop
                        }
                    }

                    // 4. If not found, add new product to cart
                    if (!product_found) {
                        member.cart_items.push({
                            product: frm.doc.name,
                            quantity: 1,
                            price: frm.doc.price,
                            total: frm.doc.price
                        });
                    }

                    // 5. Save updated member document
                    await frappe.call({
                        method: 'frappe.client.save',
                        args: {
                            doc: member
                        },
                        callback: function (r) {
                            frappe.msgprint(
                                product_found
                                    ? `${frm.doc.name} quantity updated in ${member_id}'s cart ✅`
                                    : `${frm.doc.name} added to ${member_id}'s cart ✅`
                            );
                        }
                    });

                } catch (err) {
                    console.error("Error adding to cart:", err);
                    frappe.msgprint("❌ Something went wrong while adding to cart.");
                }
            });
        } else {
            frm.add_custom_button('Add to Cart', () => {
                frappe.msgprint("⚠️ No member selected. Please go from the Member page.");
            });
        }
    }
});
