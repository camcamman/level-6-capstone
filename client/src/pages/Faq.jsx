import React from 'react'
import "../styles/faq.css"

function Faq() {
    return (
        <div className="faq">
            <h3 className='faq-common'>Common questions</h3>

            <div className="question-wrapper">
                <h3 className='question'>How do I recognize a genuine sweepstakes or offer from Sunrise Foods Market?</h3>
                <p>Occasionally, we run a sweepstakes to surprise and delight our customers. In any sweepstakes where we collect your personal information, we do so in accordance with our Privacy Notice. Whole Foods Market does not notify winners of any contest via text message, nor do we recruit via text message.</p>
                <p>Sometimes, Whole Foods Market will engage a vendor to conduct insights on shopping or store experience, however we will never ask our mystery shoppers to purchase any prepaid gift cards, provide a check or wire any money as part of the mystery shopping or survey participation.</p>
            </div>
            <div className="question-wrapper">
                <h3 className='question'>Oh no! I clicked on a text message that I thought was from Sunrise Foods Market and it appears to be a text scam. Can you help me?</h3>
                <p>Whole Foods Market does not notify winners of any contest via text message. Fraudulent messages are called Smishing. Here are some tips to avoid smishing:</p>
                <ul>
                    <li>Do not respond to messages from a sender you do not recognize.</li>
                    <li>Do not send any money or purchase any gift cards to anyone you do not know</li>
                    <li>If it contains unusual formatting, spelling or grammatical mistakes or excessive punctuation like exclamation points, it may be a scam.</li>
                    <li>If you receive a request to update your information, or verify your identity, or participate in mystery shopping, do not click on the link or respond. Whole Foods Market does not send identity verification requests or recruit through SMS.</li>
                    <li>Never provide personal information in response to an unsolicited request.</li>
                    <li>Do not click on links in text messages from an unknown or unsolicited sender.</li>
                </ul>
                <p>If you believe you have clicked a fraudulent link, contact your financial institution immediately to protect your accounts. Do not click additional links in the message or share personal data via text message.</p>
            </div>
            <div className="question-wrapper">
                <h3 className='question'>How do I apply for a job at Whole Foods Market?</h3>
                <p>You can search our online job listings for openings at Whole Foods Market stores, global and regional offices and distribution centers. Please note that job openings at stores “opening soon” will be posted in a timely manner.</p>
            </div>
            <div className="question-wrapper">
                <h3 className='question'>I have questions about my job application. Where can I get help?</h3>
                <p>If you have questions about your job application, please contact the appropriate store, regional office or national office directly.

                    Direct link to question: I have questions about my job application. Where can I get help?</p>
            </div>
            <div className="question-wrapper">
                <h3 className='question'>How can my nonprofit apply for sponsorship or a donation?</h3>
                <p>Local nonprofit organizations looking to partner with a local store can request a donation online. If you're looking for sponsorships, partnerships, product placements or donation requests from our global office, submit a proposal online.</p>
            </div>
        </div>
    )
}

export default Faq