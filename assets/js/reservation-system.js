// js/reservation-system.js
class ReservationSystem {
  constructor() {
    this.init();
  }

  init() {
    this.setMinDate();
    this.setupEventListeners();
  }

  setMinDate() {
    // Set min date to today
    const dateInput = document.getElementById("resDate");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
    }
  }

  setupEventListeners() {
    const reservationForm = document.getElementById("reservationForm");
    if (reservationForm) {
      reservationForm.addEventListener("submit", (e) =>
        this.handleReservationSubmit(e)
      );
    }
  }

  async handleReservationSubmit(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = "Making Reservation...";
      submitBtn.disabled = true;

      // Generate reservation ID
      const reservationId =
        "RES-" + Math.random().toString(36).substr(2, 6).toUpperCase();

      const reservationData = {
        name: document.getElementById("resName").value,
        email: document.getElementById("resEmail").value,
        phone: document.getElementById("resPhone").value,
        date: document.getElementById("resDate").value,
        time: document.getElementById("resTime").value,
        people: document.getElementById("resGuests").value,
        specialRequests:
          document.getElementById("specialRequests")?.value || "",
        reservation_id: reservationId,
        timestamp: new Date().toLocaleString(),
      };

      // Prepare template parameters for EmailJS
      const templateParams = {
        date: reservationData.date || "Not provided",
        time: reservationData.time || "Not provided",
        people: reservationData.people || "Not provided",
        name: reservationData.name || "Not provided",
        phone: reservationData.phone || "Not provided",
        email: reservationData.email || "Not provided",
        specialRequests:
          reservationData.specialRequests || "No special requests",
        timestamp: reservationData.timestamp,
        reservation_id: reservationData.reservation_id,
      };

      console.log("Sending Reservation Email:", templateParams);

      // Send email using EmailJS
      await emailjs.send("service_uvwuw6g", "template_7xa0yxb", templateParams);

      this.showMessage(
        `🎉 Reservation submitted successfully! Your Reservation ID: ${reservationId}`,
        "success"
      );
      e.target.reset();
    } catch (error) {
      console.error("Error making reservation:", error);
      let errorMsg = "Error making reservation. Please try again.";
      if (error.text) {
        errorMsg += "\nEmail error: " + error.text;
      }
      this.showMessage(errorMsg, "error");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showMessage(message, type) {
    let messageDiv = document.getElementById("reservationMessage");
    if (!messageDiv) {
      messageDiv = document.createElement("div");
      messageDiv.id = "reservationMessage";
      messageDiv.style.cssText = `
        padding: 15px;
        margin: 15px 0;
        border-radius: 5px;
        font-weight: bold;
      `;
      const form = document.getElementById("reservationForm");
      form.parentNode.insertBefore(messageDiv, form);
    }

    messageDiv.textContent = message;
    messageDiv.style.backgroundColor =
      type === "success" ? "#d4edda" : "#f8d7da";
    messageDiv.style.color = type === "success" ? "#155724" : "#721c24";
    messageDiv.style.display = "block";

    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ReservationSystem();
});
