export default function Welcome() {
    return (
        <section className="bg-white text-black py-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Text Column */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="text-red-600">WELCOME TO</span> OUR MECHANIC
                    </h2>
                    <p className="mb-4">
                        Our Mechanic Inc. is a very busy, small, family-owned automotive repair facility dedicated to providing top-notch service and care for our customers&#39; vehicles. We have been operating since 2004 and pride ourselves on our commitment to quality workmanship and customer satisfaction.
                    </p>
                </div>
                {/* Image Column */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="/services/brakes.png"
                        alt="Shop image"
                        className="max-w-md rounded shadow w-full"
                    />
                </div>
            </div>
        </section>
    );
}