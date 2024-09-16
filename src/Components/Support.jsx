import React, { useState } from 'react'
import Accordions from '../SharedComponets/Accordians'
import { Accordion } from 'react-bootstrap'
import { FAQsSetA, FAQsSetB } from "../Helper/JsonStaticData/FAQs";
import supportBanner from "../assets/SupportBanner.png";
import "./component.scss";
import { MobileView, BrowserView } from 'react-device-detect';
import FreeTrailBanner from '../SharedComponets/FreeTrailBanner';

const Support = () => {
  const [defaultKey, setDefaultkey] = useState(0); // here we are setting the default or opened accordian number
  const GetActiveAccordian = (activeId) => { setDefaultkey(activeId); }
  return (
    <>

      <div className="container my-5 py-3">
        <div className="row">
          <div className=" container col-md-5 pe-5">
            <div className="">
              <h1 className='text-white'>Welcome to our  support page!</h1>
              <p className='text-secondary mt-3'>We're here to help you with any problems you may be having with our product.</p>
            </div>
            <BrowserView>
              <img src={supportBanner} className='mt-5' width="450px" alt="support banner" />
            </BrowserView>
            <MobileView>
              <img src={supportBanner} className='mt-5' width="400px" alt="support banner" />
            </MobileView>
          </div>
          <div className="container col-md-7 p-0 mt-4 rounded-3 border border-dark border-3" style={{backgroundColor:"black"}}>
            <div className="p-5">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className='text-white mb-3' htmlFor="firstName">First Name</label>
                  <input className="form-control bg-dark support border-1 border-dark" placeholder="Enter First Name" id="firstName" />
                </div>
                <div className="col-md-6 mb-4">
                  <label className='text-white mb-3' htmlFor="lastName">Last Name</label>
                  <input className="form-control bg-dark border-dark" id="lastName" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className='text-white mb-3' htmlFor="Email">Email</label>
                  <input className="form-control bg-dark border-dark" id="Email" />
                </div>
                <div className="col-md-6 mb-4">
                  <label className='text-white mb-3' htmlFor="PhoneNUmber">Phone Number</label>
                  {/* <PhoneInput
                    country={['in']}
                    disableDropdown={false}
                    disableCountryCode={false}
                    value={phoneNumber}
                    onChange={phone => setPhonenUmber({ phone })}
                  /> */}
                  <input className="form-control bg-dark border-dark" id="PhoneNUmber" />
                  {/* <PhoneInput defaultCountry="IN" className='form-control' placeholder="Enter phone number"  id="PhoneNUmber"value=""/> */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-4">
                  <label htmlFor="Message" className='mb-4 text-white'>Message</label>
                  <textarea className='form-control bg-dark border-dark' name="message" id="Message" rows="5"></textarea>
                </div>
              </div>
              <div className="row justify-content-between mt-4">
                <div className="form-check col-12 col-md-9 mb-3">
                  <input type="checkbox" className="form-check-input bg-dark" id="CheckBoxDefault" />
                  <label htmlFor="CheckBoxDefault" className='mb-0 text-white'>I agree with Terms of Use and Privacy Policy</label>
                </div>
                <div className='col-12 col-md-3'>
                  <button type="button" className=' w-100 btn btn text-white rounded background-red'>Send Messsage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 pb-5">
        <div className="row text-white justify-content-between align-items-center my-5">
          <div className='col-12 col-md-9 mb-3'>
            <h3>Frequently Asked Questions</h3>
            <p>Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.</p>
          </div>
          <div className="col-12 col-md-3">
          <button className="btn background-red text-white">Ask a Question</button>
          </div>
        </div>

        <Accordion style={{ backgeoundColor: "#141414 !important" }} defaultActiveKey={defaultKey}>
          <div className="row">
            <div className="col-md-6">
              {
                FAQsSetA?.map((item, index) => {
                  return (
                    <>
                      <Accordions key={index}
                        defaultActiveKey={defaultKey}
                        eventKey={parseInt(item?.id)}
                        Header={item?.question}
                        description={item?.description}
                        onPress={GetActiveAccordian}
                      />
                    </>
                  )
                })
              }
            </div>
            <div className="col-md-6">
              {
                FAQsSetB?.map((item, index) => {
                  return (
                    <>
                      <Accordions key={index}
                        defaultActiveKey={defaultKey}
                        eventKey={parseInt(item?.id)}
                        Header={item?.question}
                        description={item?.description}
                        onPress={GetActiveAccordian}
                      />
                    </>
                  )
                })
              }
            </div>
          </div>
        </Accordion>
      </div>

      <FreeTrailBanner/>
    </>
  )
}

export default Support