import React from "react";
import { Mail, Phone, Ticket } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-16 px-4 md:px-0 flex flex-col items-center bg-transparent">
      {/* Section Title */}
      <h2 className="text-3xl font-bold mb-10 text-white text-center">Contact Us</h2>
      <div className="max-w-5xl w-full flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden bg-transparent">
        {/* Contact Card (opaque) */}
        <div className="flex-1 bg-neutral-900 p-8 rounded-2xl shadow-lg">
          <form className="space-y-4">
            <div className="flex gap-4">
              <input type="text" placeholder="First Name" className="flex-1 px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Last Name" className="flex-1 px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <input type="text" placeholder="Phone Number" className="w-full px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <textarea placeholder="Message" className="w-full px-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="privacy" className="accent-purple-500" />
              <label htmlFor="privacy" className="text-white text-sm">You agree to our <span className="font-semibold underline">Privacy Policy</span>.</label>
            </div>
            <button type="submit" className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold shadow transition">SEND MESSAGE</button>
          </form>
        </div>
        {/* Contact Info (transparent) */}
        <div className="flex-1 bg-transparent p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Get in Touch</h2>
          <p className="text-gray-300 mb-6">You need more information? Check what other persons are saying about our product. They are very happy with their purchase.</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white"><Phone className="w-5 h-5" /> +1(424) 535 3523</li>
            <li className="flex items-center gap-3 text-white"><Mail className="w-5 h-5" /> hello@mail.com</li>
            <li className="flex items-center gap-3 text-white"><Ticket className="w-5 h-5" /> <span className="font-semibold underline">Open Support Ticket</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
