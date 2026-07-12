export default function AboutUs() {
    return (
        <section className="bg-white text-black py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Text Column */}
                <p className="mb-4">
                    Our Mechanic Inc. is a very busy, small, family-owned automotive repair facility dedicated to providing top-notch service and care for our customers&#39; vehicles. We have been operating since 2004 and pride ourselves on our commitment to quality workmanship and customer satisfaction.
                </p>
                <p className="mb-4">
                    We service all makes and models and offer comprehensive automotive services including engine repairs, computer diagnostics, insurance inspections and more! From routine maintenance to complex needs, our staff is here to do what it takes to maintain your car. We are also certified to maintain new car warranties so you can rely on us to be your one-stop service shop.
                </p>
                <img
                src="/services/brakes.png"
                alt="Shop image"
                className="max-w-md rounded shadow w-full mx-auto"
            ></img>
            </div>
            
        </section>
    );
}