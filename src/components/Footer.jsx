function Footer() {
  return (
    <section  className="bg-[#1f1306] py-6 mt-20">
      {/* Contact Section */}
      <div
        id="contact-us"
        className="flex flex-col md:flex-row gap-4 lg:gap-0 justify-between items-center max-w-[90%] mx-auto"
      >
        <img src="/logo.png" alt="Logo" />

        <div className="text-white text-xl grid lg:justify-items-end justify-items-start gap-4">
          <p>
            Contact us:
            <span className="ml-2">0700 000 000</span>
          </p>
          <p>info@hoteler.com</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex justify-between items-center mt-6 border-t-2 border-[#d1964e] pt-6 max-w-[90%] mx-auto">
        <p className="text-white">© 2025 ThemeMascot Agency</p>

        <div className="flex items-center gap-4 mt-0 lg:mt-5">
          <a href="https://www.facebook.com/">
            <img src="/f.svg" alt="Facebook" />
          </a>
          <a href="https://x.com/">
            <img src="/x.svg" alt="Twitter/X" />
          </a>
          <a href="https://www.linkedin.com/home">
            <img src="/linked-in.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
