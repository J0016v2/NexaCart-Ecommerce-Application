export default function OrderTabs({ orderTabs, selectedTab, onSelectTab }) {
  return (
    <section className="order-page-tabs">
      {orderTabs.map((tab) => {
        return (
          <label key={tab}>
            <input
              type="radio"
              name="order-tab"
              value={tab}
              checked={selectedTab === tab}
              onChange={() => onSelectTab(tab)}
            />

            <span>{tab}</span>
          </label>
        );
      })}
    </section>
  );
}
