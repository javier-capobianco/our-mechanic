"use client"
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        We'd love to hear from you! Use the form below to reach out with any
        questions, service inquiries, or feedback.
      </p>

      {/* Contact Form + Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-gray-600 shadow">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-800 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-600 rounded-md p-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-800 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-600 rounded-md p-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium text-gray-800 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-600 rounded-md p-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Reach Us Directly</h3>
          <p className="text-gray-700 mb-2">
            📍 3927 3-A St NE, Calgary, AB
          </p>
          <p className="text-gray-700 mb-2">
            📞 <a href="tel:+14032777174" className="text-red-600 hover:underline">403-277-7174</a>
          </p>
          {/* <p className="text-gray-700 mb-4">
            ✉️ <a href="mailto:info@autoshop.ca" className="text-red-600 hover:underline">info@autoshop.ca</a>
          </p> */}

          <h4 className="font-semibold text-gray-800 mb-1">Hours of Operation</h4>
          <ul className="text-gray-700 space-y-1">
            <li>Mon–Fri: 8:00 AM – 5:00 PM</li>
            <li>Sat-Sun: Closed</li>
          </ul>

        
          {/* Embedded Google Maps */}
            <div className="h-64 mt-3 md:h-72 rounded-lg overflow-hidden shadow-md border border-gray-300">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.098813897888!2d-114.05645652365209!3d51.08818387172094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5371650b010e77e7%3A0x3c3c7ba43c7be32b!2sOur%20Mechanic%20Inc!5e0!3m2!1ses!2sca!4v1762072000869!5m2!1ses!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-600 shadow">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Do I need an appointment?</h3>
            <p className="text-gray-600">
              Appointments are recommended to ensure quick service, but walk-ins are welcome when possible.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">How soon will I get a response?</h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24 hours during business days.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Do you handle warranty or insurance repairs?</h3>
            <p className="text-gray-600">
              Yes, we work with most major warranty and insurance providers. Contact us for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
