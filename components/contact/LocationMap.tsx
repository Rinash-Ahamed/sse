export default function LocationMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <iframe
        title="Shree Sanjay Equipments location in Coimbatore"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.84082433799!2d77.05599357409118!3d11.050558254079414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857669ed255a5%3A0x28bd3e5c42bf9cf!2sShree%20Sanjay%20Equipments!5e0!3m2!1sen!2sin!4v1790237770665!5m2!1sen!2sin"
        width="600"
        height={compact ? 290 : 450}
        className={compact ? "block h-[250px] w-full border-0 sm:h-[290px]" : "block h-[320px] w-full border-0 sm:h-[400px] lg:h-[300px] xl:h-[400px]"}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
