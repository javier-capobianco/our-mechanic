"use client";
import { useEffect, useState } from "react";
import Services from "@/src/components/appointment/services";
// 1. Define what a brand object looks like
interface CarBrandEntry {
  brand: string;
  models: string[];
}

// 2. Define the overall structure (Keys are years, values are arrays of brands)
interface CarData {
  [year: string]: CarBrandEntry[];
}
export default function Appointment() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    carBrand: "",
    carModel: "",
    carYear: 0,
    name: "",
    phone: "",
    email: "",
    date: "",
    timeHour: "9",
    timeMinute: "00",
    timePeriod: "AM",
    notes: "",
  });

  const [carBrands, setCarBrands] = useState<CarData>({});

  useEffect(() => {
    fetch("/api/carData")
      .then(res => res.json())
      .then(data => setCarBrands(data));
  }, []);

  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentData = {
      ...formData,
      selectedServices,
    };

    alert("Appointment submitted!");
  };

  // Generate years dynamically (current year - )
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: (currentYear - 1985) + 1 }, (_, i) => String(currentYear - i));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Book an Appointment</h1>

      {/* Services Section */}
      <Services onServiceToggle={handleServiceToggle} selectedServices={selectedServices} />
      
      {/* Appointment Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-xl shadow-md p-6 border border-gray-200"
      >
        <p className="text-gray-700 mb-4">
          Select the date and time that is most convenient for you. Your request must be at least{" "}
          <strong>48 hours in advance</strong>. Enter the description and any comments to let us know what you
          need. Please remember that your appointment is not scheduled until you receive a follow-up from us
          confirming your request.
        </p>

        {/* Date and Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Appointment Request Day/Time
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-600 rounded-md p-2 w-full"
              required
            />

            {/* Time selection */}
            <div className="flex items-center gap-2">
              <select
                name="timeHour"
                value={formData.timeHour}
                onChange={handleChange}
                className="border border-gray-600 rounded-md p-2 w-20"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>

              <span>:</span>

              <select
                name="timeMinute"
                value={formData.timeMinute}
                onChange={handleChange}
                className="border border-gray-600 rounded-md p-2 w-20"
              >
                {["00", "15", "30", "45"].map(min => (
                  <option key={min}>{min}</option>
                ))}
              </select>

              <select
                name="timePeriod"
                value={formData.timePeriod}
                onChange={handleChange}
                className="border border-gray-600 rounded-md p-2 w-20"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>

            <div className="text-gray-600 text-sm">
              <p>Available time</p>
              <p className="italic">Please call for an earlier appointment</p>
            </div>
          </div>
        </div>

        {/* Car Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Year</label>
            <select
              name="carYear"
              value={String(formData.carYear)}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2"
              required
            >
              <option value="">Select Year</option>
              {years.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Brand</label>
            <select
              name="carBrand"
              value={formData.carBrand}
              onChange={handleChange}
              className="border border-gray-600 rounded-md w-full p-2 bg-white disabled:bg-gray-200"
              required
              disabled={!formData.carYear} // Enable only if year is selected
            >
              <option value="">Select Brand</option>
              {formData.carYear && carBrands?.[formData.carYear] ? (
                carBrands[String(formData.carYear)].map((entry, index) => (
                  <option key={index} value={entry.brand}>
                    {entry.brand}
                  </option>
                ))
              ) : (
                <option disabled>Loading brands...</option>
              )}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
            <select
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2  disabled:bg-gray-200"
              required
              disabled={formData.carBrand === ""}
            >
              <option value="">Select Model</option>
              {formData.carYear && formData.carBrand && carBrands[formData.carYear] &&
                carBrands[formData.carYear]
                  .find(b => b.brand === formData.carBrand) // Find the brand object
                  ?.models.map(model => (                  // Map its models array
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))
              }
            </select>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-600 rounded-md p-2"
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the issue or any specific request..."
            className="w-full border border-gray-600 rounded-md p-2"
          />
          <p className="text-gray-600 text-sm mt-2">
            Please describe the service that you are requesting. Put as much detail as possible so the technician
            can be more prepared. Describe any and all symptoms such as smells, noises, tremors, etc.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-our-mechanic-red text-white py-2 rounded-md font-semibold hover:bg-red-600 transition cursor-pointer"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
}
