export default function Experience() {
    const yearsOfExperience = new Date().getFullYear() - 2004;
    return (
        <section className="bg-white text-black py-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Image Column */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="services/tire_inspection.png"
                        alt="Shop image"
                        className="max-w-md rounded shadow w-full"
                    />
                </div>
                {/* Text Column */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="text-red-600">{yearsOfExperience}+ YEARS</span> OF EXPERIENCE
                    </h2>
                    <p className="mb-4">
                        We service all makes and models and offer comprehensive automotive services including engine repairs, computer diagnostics, insurance inspections and more! From routine maintenance to complex needs, our staff is here to do what it takes to maintain your car. We are also certified to maintain new car warranties so you can rely on us to be your one-stop service shop.
                    </p>
                </div>
            </div>
        </section>

    )
}