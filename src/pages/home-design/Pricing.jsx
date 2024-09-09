import PricingCard from "./PricingCard";

export default function Pricing() {
  // data
  const data = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          />
        </svg>
      ),
      package_name: "Basic",
      price: "২৯৯",
      particles: ["১টি ওয়েবসাইট", "স্টাটিক ডেটা"],
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      ),
      package_name: "Pro Plus (Most Popular)",
      price: "৩৯৯",
      particles: [
        "১টি ওয়েবসাইট",
        "অ্যাডমিন ড্যাশবোর্ড",
        "আয় ব্যায় হিসাব প্যানেল",
        "অনলাইন অ্যাডমিশন",
        "ফলাফল প্যানেল",
        "ডাটা ব্যাকআপ",
        "ফুল কন্ট্রোল",
      ],
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
      package_name: "Premium",
      price: "৭৯৯",
      particles: [
        "১টি ওয়েবসাইট",
        "কাস্টম ডোমেইন",
        "অ্যাডমিন ড্যাশবোর্ড",
        "আয় ব্যায় হিসাব প্যানেল",
        "অনলাইন অ্যাডমিশন",
        "ফলাফল প্যানেল",
        "ডাটা ব্যাকআপ",
        "ফুল কন্ট্রোল",
      ],
    },
  ];

  return (
    <>
      <section className="py-20 bg-lightBg">
        <main className="px-5">
          <h1 className="section_header">অফার প্যাকেজ সমূহ</h1>

          <div className="grid grid-cols-12 gap-5">
            {data &&
              data.map((item) => <PricingCard key={item.id} data={item} />)}
          </div>
        </main>
      </section>
      <div id="contact-form"></div>
    </>
  );
}
