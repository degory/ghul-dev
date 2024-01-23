(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{310:function(e,t,i){"use strict";i.r(t);var a=i(14),o=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"bootstrap"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#bootstrap"}},[e._v("#")]),e._v(" bootstrap")]),e._v(" "),t("p",[e._v("As ghūl is a "),t("a",{attrs:{href:"https://github.com/degory/ghul",target:"_blank",rel:"noopener noreferrer"}},[e._v("self hosting compiler"),t("OutboundLink")],1),e._v(", it can compile itself. To get to this point required bootstrapping the compiler. Although bootstrapping it is now straightforward, and it's routinely bootstrapped by the CI/CD pipeline on every PR merge and release, the initial bootstrap was much more complex.")]),e._v(" "),t("p",[e._v("The original basis for the compiler was written many years ago in C++, and it compiled a language quite different to ghūl - a language I called L. I bootstrapped this L compiler by manually translating the compiler source code from C++ into L. This was made easier (if not less tedious) by carefully sticking to an L compatible subset of C++ when writing the L compiler.")]),e._v(" "),t("p",[e._v("Then a few years later when I decided to design the ghūl programming lanuage, I needed a new compiler. I wrote this first iteration of the ghūl compiler in L. The early versions of this compiler a simple source level L to L transpiler. These early versions did no semantic analysis at all, relying on the L compiler to catch and report all semantic errors.")]),e._v(" "),t("p",[e._v("I then extended this L to L transpiler to accept and generate both ghūl and L syntax. Next I ran the L source for the transpiler through itself in ghūl output mode, to produce a new version written in ghūl. This got me a simple self hosting ghūl compiler, although it was very primitive, still doing no semantic analysis.")]),e._v(" "),t("p",[e._v("Then I gradually added semantic analysis to the compiler, giving it representations of classes, traits, methods, functions, variables, and the like, and all the type and other semantic checks that go with that.")]),e._v(" "),t("p",[e._v("Once the compiler was building a sufficiently detailed representation of input programs, I added a .NET IL generation back end, retaining the L source code backend alongside it until the .NET IL backend was stable enough to host the compiler.")]),e._v(" "),t("p",[e._v("Finally, once the compiler was self-hosting on .NET, I was able to remove the L transpilation backend, and the compiler was bootstrapped onto .NET.")]),e._v(" "),t("p",[e._v("You can see this process in the Git history in the ghūl compiler repo, going all the way back to the initial commit.")])])}),[],!1,null,null,null);t.default=o.exports}}]);