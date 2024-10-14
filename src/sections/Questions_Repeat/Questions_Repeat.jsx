
import './Questions_Repeat.css'
import  { useState } from 'react';

const ArabicAcademy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container elementor-column elementor-col-100 elementor-top-column elementor-element">
      <div className="elementor-widget-wrap elementor-element-populated">
        <div className="elementor-element elementor-widget elementor-widget-elementskit-heading">
          <div className="elementor-widget-container">
            <div className="ekit-wid-con">
              <div className="ekit-heading elementskit-section-title-wraper text_center">
                <h2 className="ekit-heading--title elementskit-section-title fw-bold text-center">
                  لماذا سأسجل أبنائي في أكاديمية اللغة العربية؟
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="elementor-element elementor-widget elementor-widget-elementskit-accordion mt-5 mb-5">
          <div className="elementor-widget-container">
            <div className="ekit-wid-con">
              <div className="elementskit-accordion accoedion-primary">
                {accordionData.map((item, index) => (
                  <div className={`elementskit-card ${activeIndex === index ? 'active' : ''}`} key={index}>
                    <div className="elementskit-card-header" id={`primaryHeading-${index}`}>
                      <a
                        href={`#collapse-${index}`}
                        className="ekit-accordion--toggler elementskit-btn-link"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={activeIndex === index}
                        aria-controls={`Collapse-${index}`}
                      >
                        <span className="ekit-accordion-title">{item.title}</span>
                        <div className="ekit_accordion_icon_group">
                          <div className="ekit_accordion_normal_icon">
                            <i aria-hidden="true" className={`icon-right icon ${activeIndex === index ? 'icon-up-arrow' : 'icon-down-arrow1'}`}></i>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      id={`Collapse-${index}`}
                      className={`elementskit-card-body ekit-accordion--content ${activeIndex === index ? '' : 'collapse'}`}
                      aria-labelledby={`primaryHeading-${index}`}
                    >
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="elementor-element elementor-widget-elementskit-dual-button-center elementor-widget  mb-5">
          <div className="elementor-widget-container">
            <div className="ekit-wid-con">
              <div className="ekit-element-align-wrapper">
                <div className="ekit_double_button">
                  <a className="ekit-double-btn ekit-double-btn-one" href="https://arabicacademy.online/the-courses/live-courses/">
                    <i aria-hidden="true" className="tsicon tsicon-plus_fill"></i>الدورات
                  </a>
                  <a className="ekit-double-btn ekit-double-btn-two" href="https://arabicacademy.online/the-courses/live-courses/">
                    سجل معنا<i aria-hidden="true" className="tsicon tsicon-user_plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const accordionData = [
  {
    title: 'مستوى التعليم قوي ومتميز',
    content: 'لأننا نحرص على تنمية مهارات اللغة الأربعة (القراءة والكتابة والتحدث والاستماع) بطرق احترافية، ليتقن الطالب لغته بأسرع وقت.',
  },
  {
    title: 'دروس مليئة بالمرح والفائدة وغرس حب اللغة العربية',
    content: 'نحرص كثيراً على تحبيب الأبناء بلغتهم العربية بتطبيق الأنشطة التي تراعي مواهبهم وميولهم.',
  },
  {
    title: 'مناهج علمية تفاعلية متطورة',
    content: 'نقدم لطلابنا أحدث المناهج التربوية والتفاعلية، والمجهّزة من قبل المتخصصين.',
  },
  {
    title: 'كل طالب هو مشروع مستقبل',
    content: 'ابنك محط اهتمامنا نبني شخصيته ليكون واثقاً من نفسه، قادراً على التعبير عنها بشجاعة بلغته العربية.',
  },
  {
    title: 'مسارات وباقات مناسبة لميزانيتك',
    content: 'مع المسار الخاص، أو الجماعي، أو المسجل، تستطيع اختيار ما يناسب ميزانيتك.',
  },
  {
    title: 'اهتمام بالقيم الأخلاقية والتربوية',
    content: 'نربط اللغة بالقيم الأخلاقية لأننا نؤمن أن العربية وعاء الدين والثقافة الأصيلة.',
  },
  {
    title: 'مستوى التعليم قوي ومتميز',
    content: 'لأننا نحرص على تنمية مهارات اللغة الأربعة (القراءة والكتابة والتحدث والاستماع) بطرق احترافية، ليتقن الطالب لغته بأسرع وقت.',
  },
  {
    title: 'دروس مليئة بالمرح والفائدة وغرس حب اللغة العربية',
    content: 'نحرص كثيراً على تحبيب الأبناء بلغتهم العربية بتطبيق الأنشطة التي تراعي مواهبهم وميولهم.',
  },
  {
    title: 'مناهج علمية تفاعلية متطورة',
    content: 'نقدم لطلابنا أحدث المناهج التربوية والتفاعلية، والمجهّزة من قبل المتخصصين.',
  },
  {
    title: 'كل طالب هو مشروع مستقبل',
    content: 'ابنك محط اهتمامنا نبني شخصيته ليكون واثقاً من نفسه، قادراً على التعبير عنها بشجاعة بلغته العربية.',
  },
  {
    title: 'مسارات وباقات مناسبة لميزانيتك',
    content: 'مع المسار الخاص، أو الجماعي، أو المسجل، تستطيع اختيار ما يناسب ميزانيتك.',
  },
  {
    title: 'اهتمام بالقيم الأخلاقية والتربوية',
    content: 'نربط اللغة بالقيم الأخلاقية لأننا نؤمن أن العربية وعاء الدين والثقافة الأصيلة.',
  },
];

export default ArabicAcademy;
