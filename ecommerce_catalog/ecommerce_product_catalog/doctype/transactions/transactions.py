# Copyright (c) 2025, Kanishkar and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.docstatus import DocStatus

class Transactions(Document):
	def before_save(self) :
		product=frappe.get_doc("Product",self.product)
		if product.quantity>=self.quantity :
			self.price=product.price*self.quantity
		else :
			frappe.throw(f'Only {product.quantity} stock of {product.name1} is available')
	
	def on_submit(self) :
		product=frappe.get_doc('Product',self.product)
		product.quantity=product.quantity-self.quantity
		product.save()

		if product.quantity < (product.minimum_stock or 0):
        	# Set the email parameters
			subject = f"Low Stock Alert: {product.name1}"
			message = f"""
        	Hello,

			The stock for <b>{product.name1}</b> has fallen below the minimum threshold.
			<br><br>
			<b>Available Quantity:</b> {product.quantity}<br>
			<b>Minimum Threshold:</b> {product.minimum_stock}
			<br><br>
			Please take action accordingly.

			<br><br>
			Regards,<br>
			Inventory System
			"""

			# Replace with your actual email (admin/warehouse team)
			recipients = ["lordk1612@gmail.com"]

			frappe.sendmail(
				recipients=recipients,
				subject=subject,
				message=message
			)