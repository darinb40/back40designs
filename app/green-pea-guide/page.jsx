"use client";

import React, { useState } from "react";
import Link from "next/link";

// ── BUYING PATTERNS ──────────────────────────────────────────────────
const buyingPatterns = [
  { stat: "72%", text: "of customers say they are \"just looking\" at the initial greeting." },
  { stat: "71%", text: "of customers bought because they liked, trusted, and respected their salesperson." },
  { stat: "85%", text: "of customers said their salesperson did NOT control the process, build rapport, or interview them." },
  { stat: "88%", text: "of customers said they received a lousy presentation and demonstration." },
  { stat: "75%", text: "of customers bought on the spot when they felt they got a great presentation." },
  { stat: "93%", text: "of customers did not get a service walk as part of the sales process." },
  { stat: "94%", text: "of salespeople are not confident presenting the price in the close." },
  { stat: "68%", text: "of salespeople do zero follow-up — whether the customer buys or not." },
  { stat: "78%", text: "of customers who visit your showroom buy a vehicle somewhere." },
  { stat: "85%", text: "of customers made up their mind to purchase before they left their house." },
  { stat: "90%", text: "of customers purchase within one week of visiting their first dealership." },
  { stat: "38%", text: "of customers purchase within 4 hours of visiting their first dealership." },
];

// ── SURVIVAL RULES ───────────────────────────────────────────────────
const survivalRules = [
  {
    number: "01",
    title: "You're a door greeter first. Accept it.",
    body: "The first 90 days you'll greet more doors than you'll close deals. That's the job right now. Stick close to experienced people when they let you — even if they're busy and toss you a half. If you're a sponge, you will learn more in those moments than any training class will ever teach you.",
  },
  {
    number: "02",
    title: "Grind the phone. Get comfortable being uncomfortable.",
    body: "Learn a small script and make it your own. Don't sound like a robot. Have a plan of attack — decide what kind of campaign you're running and attack it. Get comfortable having awkward conversations because the phone is where your pipeline lives and dies.",
  },
  {
    number: "03",
    title: "Get management T.O.s early and often.",
    body: "Stay on your managers. They are literally there to make you money. Sometimes they're just busy — they'll prioritize what they think is most fruitful at the moment. If you want to get in there, have your shit together before you walk up. A flying T.O. is not a T.O. That's a panic move.",
  },
  {
    number: "04",
    title: "Work the service drive.",
    body: "Customers are already there. They like the dealership enough to service their car with you — use that. You'll get a ton of reps visiting with real people. If you convert, you can make serious money. They haven't had time to shop the competition or look up their trade. The clock is in your favor.",
  },
  {
    number: "05",
    title: "Don't be late. Show up early. Stay late. Say nothing about it.",
    body: "Don't announce it. Don't complain about it. Just do it. The people who grind quietly are the ones who are still here in two years.",
  },
  {
    number: "06",
    title: "This is a six-figure career if you make it that.",
    body: "Understand what you're actually sitting in front of. This is not a job — it's a profession. Treat it like one from day one.",
  },
  {
    number: "07",
    title: "Know your product. But know your customer better.",
    body: "Become an expert in your field — but remember the customer has been studying too. They don't care how much you know about the vehicle unless it's relevant to them. The 64-year-old widow does not care about horsepower. Read the room and lead with what matters to them.",
  },
  {
    number: "08",
    title: "Practice. Drill. Rehearse.",
    body: "Get good at your meet and greet and objection handling. Do it until it doesn't feel like performing. The best in this business make it look effortless — that's not natural talent, that's repetition.",
  },
  {
    number: "09",
    title: "Memorize the road to the sale.",
    body: "If your dealership has one, learn it cold. If they don't — here it is: Meet & Greet → Fact Find & Investigate → Land on a Vehicle → Test Drive with Trial Close → Service Walk → Silent Walk the Trade → Negotiate → Finance Turn → Deliver → Follow Up. This is the map. Don't freelance until you know every step.",
  },
  {
    number: "10",
    title: "All customers are in a hurry. Let that go in one ear and out the other.",
    body: "Everyone says they're busy. They still bought the car. Stay your course.",
  },
  {
    number: "11",
    title: "Silent walk the trade. Document everything.",
    body: "Seeing is believing. If you document a flaw, it becomes real to the customer. Every trade has something. If a customer can find something wrong on their brand new 28-mile Accord, you can find something on the 'cleanest Equinox you've ever seen.' Get a sheet. Write it down.",
  },
  {
    number: "12",
    title: "Always get a written commitment. Even a stupid one.",
    body: "Most of the time your manager has something up their sleeve you're completely oblivious to. They will thank you more often than not for a written commitment to do business today. Get it on paper.",
  },
  {
    number: "13",
    title: "Have amnesia when it comes to discounts.",
    body: "Just because they did it on the last Palisade doesn't mean they can this time. Ask for the money. Every deal is its own deal.",
  },
  {
    number: "14",
    title: "Ask the customer to buy the car.",
    body: "Sounds stupid. Happens all the time. Don't be the person who does everything right and then forgets to close.",
  },
  {
    number: "15",
    title: "Present the pencil with confidence. Every single time.",
    body: "Reality check — you don't make a single one of those payments. Not your trade, not your sales tax. Theirs. Stop being scared. People pay more money for things they like and love. Have you ever spent more than you wanted on a pair of shoes because they were bad ass? People do this with cars too. Earn the right to ask for the gross. That means giving a million dollar walkaround.",
  },
  {
    number: "16",
    title: "Don't negotiate on the lot.",
    body: "Never. Not once. That conversation happens at the desk. Hold the line.",
  },
  {
    number: "17",
    title: "Be a professional question asker.",
    body: "Ask questions that get you the answer you want or point you to the next step. 'If you got a new car and lowered your payment, that would be hard to say no to, wouldn't it?' When a customer asks for your best price, answer with a question. Make suggestions — people love telling you when you're wrong. That's how you get information through the back door.",
  },
  {
    number: "18",
    title: "Show your work. Everything lives in the CRM.",
    body: "Think of the car business like math class. If you don't show your work, it doesn't exist. Every call, every visit, every follow up — it goes in the CRM. Your pipeline lives there. If it's not logged, it didn't happen.",
  },
  {
    number: "19",
    title: "Master five common objections.",
    body: "Pick the five you hear the most. Work them until you own them. You can't anticipate everything but you can be ready for the ones that show up every single week. Check the Objection Playbook tab.",
  },
  {
    number: "20",
    title: "Split deals — figure it out between you two first.",
    body: "Work it out with your counterpart before you go to a manager. You're a grown professional. Figure it out.",
  },
];

// ── GLOSSARY ─────────────────────────────────────────────────────────
const glossaryTerms = [
  { term: "ACV", full: "Actual Cash Value", definition: "What the trade is actually worth at auction. Not what the customer thinks it's worth. Not what they owe. What it's worth. Know the difference." },
  { term: "Pencil", full: "The Deal Structure", definition: "The numbers. Finance terms, payment, down payment, trade value — all structured on paper. When your manager hands you a pencil, they're handing you a proposal to present. Present it with confidence." },
  { term: "T.O.", full: "Turn Over", definition: "Where you set up your manager for an introduction. This is a structured, intentional move — not chasing a customer to their car and sprinting back with a manager. That's a flying T.O. Avoid it." },
  { term: "Flying T.O.", full: "What Not to Do", definition: "Running to grab a manager because a customer is walking out without warning. Reactive, desperate, usually too late. Set up your T.O. before they get to the door." },
  { term: "R.O.", full: "Repair Order", definition: "Document from the service department with everything done to a vehicle — parts, labor, mileage, history. Useful when working a trade. Know how to read one." },
  { term: "CSI", full: "Customer Satisfaction Index", definition: "The survey score that follows every deal. Manufacturers and your dealership care deeply about this. Treat every delivery like a survey is coming — because one is." },
  { term: "CRM", full: "Customer Relationship Manager", definition: "Your pipeline. Your database. Your livelihood. Everything gets logged here. If it's not in the CRM, it didn't happen. Use Click to Call so calls are tracked automatically." },
  { term: "VSC", full: "Vehicle Service Contract", definition: "Stop saying 'extended warranty.' That language creates resistance. It's a Vehicle Service Contract. Say it that way every time." },
  { term: "Bumper to Bumper", full: "A Misnomer", definition: "The bumper is not covered. Stop saying bumper to bumper. Use 'Comprehensive Coverage' or 'Basic Limited Warranty.' Accuracy builds trust." },
  { term: "Skate", full: "Taking Someone Else's Customer", definition: "When you intentionally work a customer that belongs to another salesperson. Don't do it. The floor has a long memory." },
  { term: "Split Deal", full: "Two Salespeople, One Customer", definition: "Figure it out between yourselves before it goes to a manager. You're adults. Settle it cleanly, document the agreement, move on." },
  { term: "Half", full: "Half a Deal", definition: "When you get brought in on a deal already in progress by a more experienced salesperson. You'll split the commission. Don't complain. Learn everything you can from watching how they work it." },
  { term: "Silent Walk", full: "Walking the Trade Quietly", definition: "Walking around the customer's trade-in and documenting every flaw without making a big deal of it. What's written down becomes real. Every trade has something. Find it." },
  { term: "Road to the Sale", full: "The Process", definition: "The 10-step framework: Meet & Greet → Fact Find → Land on a Vehicle → Test Drive with Trial Close → Service Walk → Silent Walk the Trade → Negotiate → Finance Turn → Deliver → Follow Up. Memorize it." },
  { term: "Back Door", full: "Getting Information Indirectly", definition: "Making suggestions instead of asking direct questions so the customer corrects you and reveals what you need to know. If you're wrong, they'll tell you. That's the point." },
  { term: "Written Commitment", full: "Signed Offer", definition: "Getting the customer to sign something — even a lowball offer — to commit to doing business today. Your manager often has tools you don't know about. A written commitment gives them something to work with." },
  { term: "LLTB", full: "Like, Listen, Trust, Buy", definition: "The customer must like you before they will listen to you, before they trust you, before they will buy from you. Every interaction runs through this filter. Don't skip steps." },
  { term: "Time Kills Deals", full: "Urgency Principle", definition: "The longer a deal sits, the more it dies. Lay out a realistic timeline for the next steps to keep the customer engaged and the deal moving." },
];

// ── OBJECTION PLAYBOOK ───────────────────────────────────────────────
const objections = [
  {
    objection: "I'm just looking.",
    response: "Hey — you're actually my favorite customer. My easiest job is when somebody doesn't have to buy today. If you decide to, that's fine. Either way, I'm just here to help and there's no pressure on either one of us. Sound fair?",
  },
  {
    objection: "We're not buying anything today.",
    response: "I understand everybody must start somewhere. First you look. Then you find something you like. Then you find someone who will take care of you and make you an amazing deal. It's not a matter of IF you're going to buy, but WHEN — and WHEN is when the deal is right. Let me show you a quick 5-minute proposal I guarantee will be hard to say no to. Follow me inside.",
  },
  {
    objection: "I need to think about it.",
    response: "Of course you need to think about it. I haven't given you enough information NOT to think about it. What I'd like to do is give you a quick 5-minute proposal of all the facts and figures so that when you go home tonight, you truly have all the numbers to make an educated decision. You may just like my figures so much you don't want to wait. Either way, you'll have everything. Come with me.",
  },
  {
    objection: "I have a few more cars I want to look at.",
    response: "Let's say you already checked out the other vehicles and mine was the last one. What would be the deciding factor in the end — the car itself, or the car you got the best deal on? So it's not a matter of IF you're going to buy, but WHEN — and WHEN is when the deal is right, right?",
  },
  {
    objection: "I never buy on my first stop.",
    response: "Not too long ago, customers had to visit 3 dealerships before buying. Now with all the information available online, the average customer only needs to visit one. It's not a matter of if you buy, but WHEN — and WHEN is when the deal is right. Let me show you a quick 5-minute proposal. In the end it's completely your decision. Come with me.",
  },
  {
    objection: "I need to sleep on it.",
    response: "When someone says they need to think, it usually means one of two things — they're not interested, or something about the deal doesn't feel right. You like the vehicle, right? It has everything you want? OK, so something about the deal is bothering you. Is it the price, the payment, or the trade?",
  },
  {
    objection: "What's your best price?",
    response: "I'll be happy to get that for you — but what was it about this vehicle that made you ask that question about the price? Was it the color? The features? The trim level? (Make suggestions — they'll tell you when you're wrong, which tells you exactly what matters to them.)",
  },
  {
    objection: "The miles are too high.",
    response: "If you bought a similar vehicle with fewer miles, you'd spend more money. If you drove both for 3 years, which one would you owe more on? The one with fewer miles. With our vehicle, the biggest part of the depreciation cycle has already been absorbed. You won't be upside down. That's actually the smart financial move.",
  },
  {
    objection: "My bank offers a better rate.",
    response: "99% of customers with great credit don't like to put all their eggs in one basket. It's always smart to diversify your loans across different institutions. We use nationwide lenders that report to all 3 credit bureaus in all 50 states — it actually looks better on your credit and the difference in payment is nearly nothing.",
  },
  {
    objection: "I want to wait until I sell my car outright.",
    response: "Have you recently sold a vehicle on your own? If I could get really close to what you want for it, would it be worth meeting strangers from the internet and letting them drive your car around? Let me make you an offer — even if you decide to sell it after, you'll have a basis of comparison. And our appraisers are offering up to 110% of book. Plus when you trade with us, you get a tax credit applied immediately. That could save you thousands.",
  },
  {
    objection: "It's getting late, we'll come back tomorrow.",
    response: "The fact that you're still here tells me getting into a new vehicle is important to you. Nobody plans the ideal time to buy a car — it just happens. The good news is we're already 99% done with the deal and I am extremely fast at getting this last 1% done. Let me show you how quickly I can wrap this up for you.",
  },
  {
    objection: "I don't want to pay a doc fee.",
    response: "I understand. Do you have the paperwork from your last vehicle? I can tell you with certainty — you couldn't have driven off any lot without paying a doc fee. It's on every single vehicle you've ever purchased. Ours is only $129. Most stores in our area have over $1,000. It would actually cost you more to do business anywhere else.",
  },
  {
    objection: "I don't have any money down.",
    response: "99% of my clients choose to put the down payment on a credit card — you can choose how and when to pay it off, you don't have to put anything down today. The banks like to see a little customer participation — it helps with better rates and approvals. Which card would you like to put it on?",
  },
  {
    objection: "I want my payoff for my trade.",
    response: "What you owe and what the vehicle is worth are two different things. If you owed nothing on it, would you want nothing for it? Of course not — you'd want what it's worth. So what you owe and what it's worth are two separate conversations.",
  },
  {
    objection: "The rate is too high.",
    response: "(Sub-prime) I'm not asking you to marry this rate — just date it for a little while. Think of this like a chess match. We can't win in one move, we have to set our pieces up strategically. This sets you up to trade out in a year or two and better your position. You have to do your part and make all your payments on time. Can you do that? Great. Let's sign up — come see me in a year and I'll help you again.",
  },
];

export default function GreenPeaGuidePage() {
  const [activeSection, setActiveSection] = useState("patterns");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080808; color: white; font-family: 'DM Mono', monospace; overflow-x: hidden; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .tab-btn {
          flex: 1; padding: 12px 8px;
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.18em;
          text-transform: uppercase; border: none;
          cursor: pointer; transition: all 0.15s ease;
          -webkit-tap-highlight-color: transparent;
          white-space: nowrap;
        }
        .rule-card {
          display: grid; grid-template-columns: 44px 1fr;
          gap: 1.25rem; padding: 1.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          align-items: start;
        }
        .rule-card:last-child { border-bottom: none; }
        .glossary-card {
          padding: 1.25rem; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 3px; background: #0f0f0f;
          transition: border-color 0.15s ease;
        }
        .glossary-card:hover { border-color: rgba(220,38,38,0.2); }
        .objection-card {
          padding: 1.5rem; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 3px; background: #0f0f0f;
          transition: border-color 0.15s ease;
        }
        .objection-card:hover { border-color: rgba(220,38,38,0.15); }
        .stat-card {
          padding: 1.25rem; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 3px; background: #0f0f0f;
          display: flex; gap: 1rem; align-items: flex-start;
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "65dvh", position: "relative",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "6rem 1.5rem 3rem",
        overflow: "hidden", background: "#080808",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/frontline-showroom-bg.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #080808 25%, transparent 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }} className="fade-up">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(220,38,38,0.25)", background: "rgba(220,38,38,0.08)", borderRadius: "100px", padding: "5px 14px", marginBottom: "1.25rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#dc2626", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#dc2626" }}>B40 // Back Lot — Classified</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 12vw, 8rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "white", marginBottom: "1.25rem" }}>
            The Green<br /><span style={{ color: "#dc2626" }}>Pea Guide.</span>
          </h1>
          <p style={{ fontSize: "clamp(13px, 2vw, 16px)", lineHeight: 1.75, color: "rgba(255,255,255,0.5)", maxWidth: "520px" }}>
            Everything nobody told you when you walked in.{" "}
            <span style={{ color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>Read it. Learn it. Don't get sent to find the lot stretcher.</span>
          </p>
        </div>
      </section>

      {/* ── LLTB CALLOUT ── */}
      <div style={{ background: "rgba(220,38,38,0.06)", borderTop: "1px solid rgba(220,38,38,0.1)", borderBottom: "1px solid rgba(220,38,38,0.1)", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", color: "white", letterSpacing: "0.08em" }}>
          L · L · T · B
        </p>
        <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
          Like &nbsp;·&nbsp; Listen &nbsp;·&nbsp; Trust &nbsp;·&nbsp; Buy
        </p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "8px", fontStyle: "italic", maxWidth: "500px", margin: "8px auto 0" }}>
          The customer must like you before they will listen to you, before they trust you, before they will buy from you.
        </p>
      </div>

      {/* ── TABS ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", width: "100%", maxWidth: "900px", margin: "0 auto", overflowX: "auto" }}>
          {[
            { id: "patterns", label: "The Numbers" },
            { id: "survival", label: "Survival Guide" },
            { id: "glossary", label: "Glossary" },
            { id: "objections", label: "Objection Playbook" },
          ].map((tab) => (
            <button
              key={tab.id}
              className="tab-btn"
              onClick={() => setActiveSection(tab.id)}
              style={{
                background: activeSection === tab.id ? "rgba(220,38,38,0.1)" : "transparent",
                color: activeSection === tab.id ? "#dc2626" : "rgba(255,255,255,0.3)",
                borderBottom: activeSection === tab.id ? "2px solid #dc2626" : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem 6rem", width: "100%" }}>

        {/* THE NUMBERS */}
        {activeSection === "patterns" && (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.5rem" }}>Customer Buying Patterns</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "white", letterSpacing: "0.04em" }}>
                Know the Game Before You Play It.
              </h2>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginTop: "0.5rem", maxWidth: "560px" }}>
                These numbers don't lie. Most salespeople never bother to learn them. You just did.
              </p>
            </div>
            <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {buyingPatterns.map((item) => (
                <div key={item.stat} className="stat-card">
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: "#dc2626", lineHeight: 1, letterSpacing: "0.03em", flexShrink: 0 }}>
                    {item.stat}
                  </span>
                  <p style={{ fontSize: "11px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid rgba(220,38,38,0.15)", borderRadius: "3px", background: "rgba(220,38,38,0.04)" }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontStyle: "italic" }}>
                "Most customers put up a wall while some will flat out lie about their actual intentions. Do not take offense. Consumers are programmed to protect their assets. Use this to your advantage and be ahead of your competition."
              </p>
            </div>
          </div>
        )}

        {/* SURVIVAL GUIDE */}
        {activeSection === "survival" && (
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.5rem" }}>20 Rules</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "white", letterSpacing: "0.04em" }}>
                First 90 Days Survival Guide
              </h2>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginTop: "0.5rem", maxWidth: "500px" }}>
                Nobody hands you this when you get hired. Figure it out or don't. Most don't.
              </p>
            </div>
            <div>
              {survivalRules.map((rule) => (
                <div key={rule.number} className="rule-card">
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", color: "#dc2626", letterSpacing: "0.05em", lineHeight: 1, opacity: 0.45 }}>
                    {rule.number}
                  </p>
                  <div>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: "500", fontSize: "13px", color: "white", marginBottom: "0.5rem", letterSpacing: "0.03em", lineHeight: 1.4 }}>
                      {rule.title}
                    </p>
                    <p style={{ fontSize: "12px", lineHeight: 1.8, color: "rgba(255,255,255,0.45)" }}>
                      {rule.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GLOSSARY */}
        {activeSection === "glossary" && (
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.5rem" }}>{glossaryTerms.length} Terms</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "white", letterSpacing: "0.04em" }}>
                Dealer Glossary
              </h2>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginTop: "0.5rem", maxWidth: "500px" }}>
                Words you'll hear on day one. Know what they mean before someone uses them against you.
              </p>
            </div>
            <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {glossaryTerms.map((item) => (
                <div key={item.term} className="glossary-card">
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#dc2626", letterSpacing: "0.05em", lineHeight: 1 }}>{item.term}</span>
                    <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{item.full}</span>
                  </div>
                  <p style={{ fontSize: "11px", lineHeight: 1.75, color: "rgba(255,255,255,0.45)" }}>{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OBJECTION PLAYBOOK */}
        {activeSection === "objections" && (
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.5rem" }}>{objections.length} Objections</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "white", letterSpacing: "0.04em" }}>
                Objection Playbook
              </h2>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginTop: "0.5rem", maxWidth: "500px" }}>
                You will hear every one of these. Probably this week. Have your answer ready before they finish the sentence.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {objections.map((item, i) => (
                <div key={i} className="objection-card">
                  <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(220,38,38,0.6)", marginBottom: "0.4rem" }}>
                    Objection
                  </p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: "500", fontSize: "13px", color: "white", marginBottom: "0.75rem", lineHeight: 1.4 }}>
                    "{item.objection}"
                  </p>
                  <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.4rem" }}>
                    Response
                  </p>
                  <p style={{ fontSize: "12px", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                    {item.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2.5rem 1.5rem", maxWidth: "900px", margin: "0 auto", width: "100%", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "4px" }}>You made it this far</p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Now go play bingo in your next meeting.</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link href="/dealership-series/bingo" style={{ display: "inline-flex", alignItems: "center", background: "white", color: "#080808", padding: "10px 20px", borderRadius: "3px", fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: "500", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            Get My Bingo Card →
          </Link>
          <Link href="/dealership-series" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "rgba(255,255,255,0.3)", padding: "10px 20px", borderRadius: "3px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            Dealership Series
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" }}>© 2026 Back 40 Designs</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/dealership-series/bingo" style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Bingo</Link>
          <Link href="/" style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>Home</Link>
        </div>
      </footer>

    </>
  );
}

