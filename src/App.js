import { useEffect, useRef } from "react";
import { HostedFields, FieldTypes, Field } from "hosted-fields-sdk";
import "./styles.css";

export default function App() {
  const setupMethod = () => {
    let fieldConfig = [
      {
        type: FieldTypes.TEXT,
        id: "frmNameCC",
        autocomplete: "cc-name",
        key: "creditcard.main.name",
        helpKey: "Name",
        helpkey: "Name",
        name: "ccname",
        noAttributeValueFormatting: true,
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: false,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: false,
        defaultValue: "Jonas Helander",
      },
      {
        type: FieldTypes.CREDITCARD_NUMBER,
        autocomplete: "cc-number",
        helpKey: "Kortnummer",
        id: "frmCCNum",
        key: "creditcard.main.number",
        name: "cardnumber",
        noAttributeValueFormatting: true,
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: false,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: false,
      },
      {
        type: FieldTypes.EXPIRY_MM_YYYY,
        autocomplete: "cc-exp",
        helpKey: "•• / ••",
        id: "frmCCExp",
        key: "creditcard.main.expirymmyyyy",
        name: "cc-exp",
        noAttributeValueFormatting: true,
        pattern: "[0-9]*",
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: false,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: false,
      },
      {
        type: FieldTypes.CVV,
        autocomplete: "cc-csc",
        helpKey: "Security Code",
        id: "frmCCCVC",
        key: "creditcard.main.cvc",
        name: "cvc",
        noAttributeValueFormatting: true,
        pattern: "[0-9]*",
        required: true,
        requiredNewPayment: true,
        requiredRepeatPayment: true,
        showIcon: true,
        value: undefined,
        visible: true,
        visibleOnNewPayment: true,
        visibleOnRepeatPayment: true,
      },
    ];

    let fields = fieldConfig.map((conf) => {
      return new Field(
        conf.type,
        conf.id,
        conf.name,
        conf.label,
        conf.error,
        conf.helpKey,
        conf.visible,
        conf.required,
        conf.noAttributeValueFormatting,
        conf.autocomplete
      );
    });

    HostedFields.setup({
      merchantId: 2906,
      renderMode: "single", // render all fields in a single iframe
      hostedfieldsurl:
        "https://test-hostedpages.paymentiq.io/1.0.31/index.html",
      fields: fieldConfig,
      service: "",
      styles: "",
      callback: () => {
        handleCallback();
      },
      onLoadCallback: () => {
        handleOnLoadCallback();
      },
      autoFocusNext: true,
      el: `#hosted-fields-wrapper`,
    });
  };

  // const handleGetFields = () => {
  //   HostedFields.get();
  // };

  const handleGetFields = async () => {
    try {
      await HostedFields.get(); // Await the function if it's async
    } catch (error) {
      console.error("Error occurred while getting fields:", error);
    }
  };

  const handleCallback = () => {
    console.log("Callback");
  };
  const handleOnLoadCallback = () => {
    console.log("onLoad Callback");
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    setupMethod();
    hasInitialized.current = true;

    // Listen for messages from the Hosted Fields iframe
    const handleMessage = (event) => {
      if (event.origin !== "https://test-hostedpages.paymentiq.io") return; // Ensure it's from a trusted source
      console.log("Message received from Hosted Fields:", event.data.formData);
    };
    window.addEventListener("message", handleMessage);
    winwow.addEventListener();
  }, []);

  return (
    <div className="App">
      <h1>Hosted Fields</h1>
      <button onClick={handleGetFields}>Get fields</button>
      <div id="hosted-fields-wrapper" />´
    </div>
  );
}
