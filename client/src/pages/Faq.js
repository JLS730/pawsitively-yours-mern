import React from 'react'

import NavigationBar from '../components/NavigationBar'

import '../styles/faq.css'

const Faq = () => {
  return (
    <div className="faq-page">
      <NavigationBar />
      <div className="faq-content">

        <h1>Frequently Asked Questions</h1>

        <div class="faq-item">
          <div class="question">What is Pawsitively Yours?</div>
          <div class="answer">Pawsitively Yours is a non-profit dog adoption organization dedicated to finding loving homes for dogs in need.</div>
        </div>

        <div class="faq-item">
          <div class="question">How can I adopt a dog?</div>
          <div class="answer">To adopt a dog, browse our available dogs on our website, fill out an adoption application, undergo an interview, and complete a home visit.</div>
        </div>

        <div class="faq-item">
          <div class="question">What are the adoption fees?</div>
          <div class="answer">Adoption fees vary based on the dog’s age, breed, and medical history. They typically range from $100 to $300.</div>
        </div>

        <div class="faq-item">
          <div class="question">Do you offer a trial period?</div>
          <div class="answer">Yes, we offer a two-week trial adoption period to ensure compatibility between the dog and your household.</div>
        </div>

        <div class="faq-item">
          <div class="question">What is included in the adoption fee?</div>
          <div class="answer">The adoption fee covers spaying/neutering, vaccinations, microchipping, and a wellness check-up.</div>
        </div>

        <div class="faq-item">
          <div class="question">Can I visit the dogs before adoption?</div>
          <div class="answer">Yes, you can schedule a visit with our dogs by contacting us through our website or visiting our adoption events.</div>
        </div>

        <div class="faq-item">
          <div class="question">How can I volunteer?</div>
          <div class="answer">To volunteer, fill out our volunteer application on our website and attend a volunteer orientation session.</div>
        </div>

        <div class="faq-item">
          <div class="question">Can I donate to Pawsitively Yours?</div>
          <div class="answer">Yes, we welcome donations to support our mission. You can donate through our website or at our adoption events.</div>
        </div>

        <div class="faq-item">
          <div class="question">What should I do if I find a lost dog?</div>
          <div class="answer">If you find a lost dog, please contact your local animal control or bring the dog to a nearby veterinary clinic to scan for a microchip.</div>
        </div>

        <div class="faq-item">
          <div class="question">How can I contact Pawsitively Yours?</div>
          <div class="answer">You can contact us through our <a href="/contact">Contact</a> page on our website or email us at info@pawsitivelyyours.com.</div>
        </div>
      </div>
    </div>
  )
}

export default Faq