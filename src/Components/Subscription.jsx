import React, { useState } from 'react'
import { MonthlyPricetier, YearlyPricetier } from "../Helper/JsonStaticData/Pricetiers";
import SubscriptionDetails from "../Helper/JsonStaticData/SubscriptionPlanDetails";
import GetLabel from '../Utils/TextFormats';
import "./component.scss";
import { BrowserView, MobileView } from 'react-device-detect';
import FreeTrailBanner from '../SharedComponets/FreeTrailBanner';

const Subscription = () => {
  const [PlanDuration, setPlanDuration] = useState("monthly");
  const [planDetails, setPlanDetails] = useState(MonthlyPricetier)

  const features = [
    "price", "content", "devices", "freeTrail", "cancelAnytime", "HDR", "dolbyAtmos", "adFree", "offlineViewing", "familySharing"
  ];
  return (
    <>
      {/* Choose You plan , section for plan details */}
      <div className="container mb-5 py-4">
        <div className="row text-white align-items-center justify-content-between mb-5">
          <div className="col-12 col-md-6 mb-3">
            <h3>Choose the plan that's right for you</h3>
            <p>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
          </div>
          <div className="col-6 col-md-2">
            <div className="d-flex justify-content-between background-black rounded-3 align-items-center border border-dark p-2">
              <p type="button" className={PlanDuration.toLocaleLowerCase() === "monthly" ? "py-2 px-3 rounded text-white bg-secondary fw-2 me-3" : "text-secondary px-2"} onClick={() => { setPlanDuration("monthly"); setPlanDetails(MonthlyPricetier) }}>Monthly</p>
              <p type="button" className={PlanDuration.toLocaleLowerCase() === "yearly" ? "py-2 px-4 rounded text-white bg-secondary fw-2" : "text-secondary px-2"} onClick={() => { setPlanDuration("yearly"); setPlanDetails(YearlyPricetier) }}>Yearly</p>
            </div>
          </div>
        </div>
        <div className="row">
          {
            planDetails.map((item, index) => {
              return (
                <div className="col-md-4 mt-3">
                  <div className="card p-4 background-dark border border-dark">
                    <div className="card-body">
                      <h5 className="card-title text-white">{item.planName}</h5>
                      <div style={{ height: "10vh" }}>
                        <small className="text-white">{item?.description}</small>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                        <h4 className="text-white">{item?.price}</h4>
                        <small className="text-secondary">/{PlanDuration}</small>
                      </div>
                      <div className="d-flex mt-4 aling-items-center justify-content-between">
                        <button className="px-3 btn btn-lg text-white background-black border border-dark rounded">Start Free Trail</button>
                        <button className="px-3 btn btn-lg text-white background-red rounded">Choose Plan</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* section for all plan details in table format for desktopView*/}
      <BrowserView>
        <div className="container my-5 py-4">
          <div className="">
            <h3 className='text-white'>Compare our plans and find the right one for you</h3>
            <p className='text-white'>StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that's right <br /> for you.</p>
          </div>
          <div className=" mt-4">
            <table class="table w-100 table-responsive table-dark table-bordered border-dark">
              <thead style={{ backgroundColor: "black !important" }}>
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">Basic {SubscriptionDetails.popularPlan.toLowerCase() === "basic" && <span className='rounded background-red'><small>Popular</small></span>}</th>
                  <th className="p-4">Standard {SubscriptionDetails.popularPlan.toLowerCase() === "standard" && <span className='rounded background-red'><small>Popular</small></span>}</th>
                  <th className="p-4">Premium {SubscriptionDetails.popularPlan.toLowerCase() === "premium" && <span className='rounded background-red'><small>Popular</small></span>}</th>
                </tr>
              </thead>
              <tbody>
                {features.map(feature => (
                  <tr key={feature}>
                    <td className="p-4" style={{ textWrap: "nowrap" }}>{GetLabel(feature)}</td>
                    {SubscriptionDetails.plans.map(plan => (
                      <td className="p-4" key={plan.plan}>{plan[feature]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </BrowserView>

      {/* section for all plan details in card format for mobileView*/}
      <MobileView>
        <div className='d-flex text-white border border-dark align-items-center justify-content-between p-2 border-secondary mx-3 rounded rounded-3' style={{ backgroundColor: "black" }}>
          <div className="text-center rounded py-3 text-white fw-2" style={{ width: "33%" }}>
            <p className='m-0'>Basic</p>
          </div>
          <div className="text-center rounded py-3 text-white bg-secondary fw-2" style={{ width: "33%" }}>
            <p className='m-0'>Standard</p>
          </div>
          <div className="text-center rounded py-3 text-white fw-2" style={{ width: "33%" }}>
            <p className='m-0'>Premium</p>
          </div>
        </div>
        <div className="card mx-3 mt-3 text-white" style={{ backgroundColor: "black" }}>
          <div className="card-body">
            <div className="d-flex">
              <div className="px-3 w-50">
                <label className='text-secondary'>Price</label>
                <p>$12.99/month</p>
              </div>
              <div className="px-3 w-50">
                <label className='text-secondary'>Free Trail</label>
                <p>7 Days</p>
              </div>
            </div>
            <div className="px-3 mt-4">
              <label className='text-secondary'>Content</label>
              <p>Access to a wider selection of movies and shows, including most new releases and exclusive content</p>
            </div>
            <div className="px-3 mt-4">
              <label className='text-secondary'>Devices</label>
              <p>Watch on Two device simultaneously</p>
            </div>
            <div className="d-flex mt-4">
              <div className="px-3 w-50">
                <label className='text-secondary'>Cancel Anytime</label>
                <p>Yes</p>
              </div>
              <div className="px-3 w-50">
                <label className='text-secondary'>HDR</label>
                <p>Yes</p>
              </div>
            </div>
            <div className="d-flex mt-4">
              <div className="px-3 w-50">
                <label className='text-secondary'>Dolby Atmos</label>
                <p>Yes</p>
              </div>
              <div className="px-3 w-50">
                <label className='text-secondary'>Ad-Free</label>
                <p>Yes</p>
              </div>
            </div>
            <div className="d-flex mt-4">
              <div className="px-3 w-50">
                <label className='text-secondary'>Offline Viewing</label>
                <p>Yes, for select titles.</p>
              </div>
              <div className="px-3 w-50">
                <label className='text-secondary'>Family Sharing</label>
                <p>5 family members.</p>
              </div>
            </div>
          </div>
        </div>
      </MobileView>

      {/* section for normal basic free trail banner */}
      <FreeTrailBanner/>
    </>
  )
}

export default Subscription 