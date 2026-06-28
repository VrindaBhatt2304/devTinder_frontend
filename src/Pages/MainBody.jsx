import React from "react";
import { Link } from "react-router-dom";

export default function MainBody() {
  return (
    <div>
      <main className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full text-[11px] uppercase tracking-wider font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-8 transition-colors duration-300 hover:border-violet-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
            Built For Developers, By Developers
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.15]">
            Where Code Meets{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Connection.
            </span>
          </h1>

          {/* Paragraph description limited for cleaner typography lines */}
          <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-12 max-w-xl mx-auto font-normal">
            devTinder is the ultimate global network built exclusively for
            developers. Connect with fellow engineers, brainstorm groundbreaking
            ideas, and collaborate on the next big tech invention.
          </p>

          {/* CTA Buttons - Clear Primary vs Secondary Hierarchy */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-xl shadow-violet-600/10 hover:shadow-violet-600/20 hover:brightness-110 active:scale-[0.98] transition-all text-center tracking-wide"
            >
              Create Account (Sign Up)
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto bg-white/5 text-slate-200 font-semibold px-8 py-3.5 rounded-xl border border-slate-700/60 hover:bg-white/10 hover:text-white active:scale-[0.98] backdrop-blur-sm transition-all text-center tracking-wide"
            >
              Welcome Back (Log In)
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}