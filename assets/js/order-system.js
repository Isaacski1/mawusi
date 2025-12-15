// js/order-system.js
class OrderSystem {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    console.log("🚀 Initializing Order System...");
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Order form submission
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
      orderForm.addEventListener("submit", (e) => this.handleOrderSubmit(e));
      console.log("✅ Order form event listener added");
    } else {
      console.error("❌ Order form not found - check your HTML ID");
    }

    // Test button
    const testBtn = document.getElementById("testOrderBtn");
    if (testBtn) {
      testBtn.addEventListener("click", () => this.testOrderSave());
    }
  }

  async handleOrderSubmit(e) {
    e.preventDefault();
    console.log("📦 Order form submitted");

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = "Placing Order...";
      submitBtn.disabled = true;

      // Collect order data
      const orderData = this.collectOrderData();
      console.log("📊 Order data collected:", orderData);

      // Validate required fields
      if (
        !orderData.customerName ||
        !orderData.customerEmail ||
        !orderData.customerPhone
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Send email confirmation
      await this.sendOrderConfirmationEmail(orderData);

      // Show success message
      this.showMessage(
        `✅ Order submitted successfully! Confirmation email sent. We'll contact you shortly.`,
        "success"
      );

      // Reset form
      e.target.reset();
    } catch (error) {
      console.error("❌ Error placing order:", error);
      this.showMessage("❌ Error: " + error.message, "error");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  collectOrderData() {
    // Get form values - adjust these based on your actual form fields
    const orderData = {
      customerName: this.getValue("customerName") || "Unknown Customer",
      customerEmail: this.getValue("customerEmail") || "no-email@example.com",
      customerPhone: this.getValue("customerPhone") || "0000000000",
      customerAddress: this.getValue("customerAddress") || "",

      // Sample order items - REPLACE THIS WITH YOUR ACTUAL CART DATA
      items: [
        {
          name: "Jollof Rice",
          price: 25.0,
          quantity: 1,
          specialInstructions: "Extra spicy",
        },
        {
          name: "Grilled Chicken",
          price: 15.0,
          quantity: 2,
          specialInstructions: "",
        },
      ],

      subtotal: 55.0,
      tax: 4.4,
      total: 59.4,
      status: "pending",
      paymentMethod: "cash",
      notes: this.getValue("orderNotes") || "",
      timestamp: new Date().toISOString(),
      source: "website",
    };

    return orderData;
  }

  getValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.value.trim() : null;
  }

  testOrderSave() {
    console.log("🧪 Testing order save...");

    const testOrder = {
      customerName: "Test Customer " + new Date().toLocaleTimeString(),
      customerEmail: "test@example.com",
      customerPhone: "1234567890",
      items: [
        {
          name: "Test Pizza",
          price: 12.99,
          quantity: 1,
          specialInstructions: "Test order",
        },
      ],
      subtotal: 12.99,
      tax: 1.04,
      total: 14.03,
      status: "pending",
      paymentMethod: "cash",
      notes: "Test order from button",
      timestamp: new Date().toISOString(),
      source: "website-test",
    };

    console.log("✅ Test order created:", testOrder);
    this.showMessage(`✅ Test order created successfully!`, "success");
  }

  showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.getElementById("orderMessage");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement("div");
    messageDiv.id = "orderMessage";
    messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 10000;
            min-width: 300px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

    messageDiv.textContent = message;

    if (type === "success") {
      messageDiv.style.backgroundColor = "#d4edda";
      messageDiv.style.color = "#155724";
      messageDiv.style.border = "1px solid #c3e6cb";
    } else {
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.color = "#721c24";
      messageDiv.style.border = "1px solid #f5c6cb";
    }

    document.body.appendChild(messageDiv);

    // Auto hide after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 5000);
  }

  async sendOrderConfirmationEmail(orderData) {
    try {
      // Check if EmailJS is loaded
      if (typeof emailjs === "undefined") {
        console.warn("EmailJS not loaded, skipping email notification");
        return;
      }

      // Prepare template parameters
      const templateParams = {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        customerAddress: orderData.customerAddress || "Not provided",
        orderId: `ORD-${Date.now()}`,
        orderItems: orderData.items
          .map((item) => `${item.name} x${item.quantity} - ¢${item.price}`)
          .join("\n"),
        subtotal: `¢${orderData.subtotal.toFixed(2)}`,
        tax: `¢${orderData.tax.toFixed(2)}`,
        total: `¢${orderData.total.toFixed(2)}`,
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes || "No special requests",
        timestamp: new Date().toLocaleString(),
      };

      console.log("📧 Sending order confirmation email:", templateParams);

      // Send email via EmailJS
      const response = await emailjs.send(
        "service_uvwuw6g",
        "template_phvfhln",
        templateParams
      );

      console.log("✅ Email sent successfully:", response);
      return response;
    } catch (error) {
      console.error("❌ Error sending email:", error);
      // Don't throw - let the order still go through even if email fails
    }
  }
    messageDiv.id = "orderMessage";
    messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 10000;
            min-width: 300px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

    messageDiv.textContent = message;

    if (type === "success") {
      messageDiv.style.backgroundColor = "#d4edda";
      messageDiv.style.color = "#155724";
      messageDiv.style.border = "1px solid #c3e6cb";
    } else {
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.color = "#721c24";
      messageDiv.style.border = "1px solid #f5c6cb";
    }

    document.body.appendChild(messageDiv);

    // Auto hide after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Starting order system...");
  window.orderSystem = new OrderSystem();
});
