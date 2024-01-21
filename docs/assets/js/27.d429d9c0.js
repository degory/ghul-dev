(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{310:function(e,t,a){"use strict";a.r(t);var r=a(14),o=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"getting-started"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[e._v("#")]),e._v(" getting started")]),e._v(" "),t("h2",{attrs:{id:"prerequisites"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" prerequisites")]),e._v(" "),t("p",[e._v("The ghūl programming language compiler requires the "),t("a",{attrs:{href:"https://dotnet.microsoft.com/en-us/download/dotnet/8.0",target:"_blank",rel:"noopener noreferrer"}},[e._v(".NET 8.0 SDK"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"target"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#target"}},[e._v("#")]),e._v(" target")]),e._v(" "),t("p",[e._v("The compiler produces standard .NET assemblies and packages targeting .NET 8.0")]),e._v(" "),t("h2",{attrs:{id:"getting-the-ghul-compiler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#getting-the-ghul-compiler"}},[e._v("#")]),e._v(" getting the ghūl compiler")]),e._v(" "),t("p",[e._v("There are a few different ways to get the compiler")]),e._v(" "),t("h3",{attrs:{id:"use-a-ghul-net-project-template"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#use-a-ghul-net-project-template"}},[e._v("#")]),e._v(" use a ghūl .NET project template")]),e._v(" "),t("p",[e._v("If you initialize your project using one of the "),t("a",{attrs:{href:"https://www.nuget.org/packages/ghul.templates/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ghūl .NET project templates"),t("OutboundLink")],1),e._v(", the template will add the compiler to your project folder as a local .NET tool - just run "),t("code",[e._v("dotnet tool restore")]),e._v(" to restore it.")]),e._v(" "),t("h3",{attrs:{id:"clone-the-ghul-github-repository-template"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#clone-the-ghul-github-repository-template"}},[e._v("#")]),e._v(" clone the ghūl GitHub repository template")]),e._v(" "),t("p",[e._v("If you create a new GitHub repo from the "),t("a",{attrs:{href:"https://github.com/degory/ghul-repository-template",target:"_blank",rel:"noopener noreferrer"}},[e._v("ghūl repository template"),t("OutboundLink")],1),e._v(", then the compiler will be pre-configured as a local .NET tool in your project folder - run "),t("code",[e._v("dotnet tool restore")]),e._v(" to restore it.")]),e._v(" "),t("h3",{attrs:{id:"use-the-ghul-development-container-image"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#use-the-ghul-development-container-image"}},[e._v("#")]),e._v(" use the ghūl development container image")]),e._v(" "),t("p",[e._v("The compiler is pre-installed globally in the "),t("a",{attrs:{href:"https://github.com/users/degory/packages/container/package/ghul%2Fdevcontainer",target:"_blank",rel:"noopener noreferrer"}},[e._v("ghūl development container"),t("OutboundLink")],1)]),e._v(" "),t("h3",{attrs:{id:"install-the-compiler-as-a-local-or-global-net-tool"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#install-the-compiler-as-a-local-or-global-net-tool"}},[e._v("#")]),e._v(" install the compiler as a local or global .NET tool")]),e._v(" "),t("p",[e._v("You can manually install the compiler from the "),t("a",{attrs:{href:"https://www.nuget.org/packages/ghul.compiler/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ghūl compiler .NET tool package"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"using-the-compiler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#using-the-compiler"}},[e._v("#")]),e._v(" using the compiler")]),e._v(" "),t("h3",{attrs:{id:"project-file"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#project-file"}},[e._v("#")]),e._v(" project file")]),e._v(" "),t("p",[e._v("The compiler expects to be driven by MSBuild using a "),t("code",[e._v(".ghulproj")]),e._v(" project file.\nSee the "),t("a",{attrs:{href:"https://www.nuget.org/packages/ghul/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ghūl targets"),t("OutboundLink")],1),e._v(" package for\na minimal example, or use one of the project templates to get started.")]),e._v(" "),t("h3",{attrs:{id:"source-files"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#source-files"}},[e._v("#")]),e._v(" source files")]),e._v(" "),t("p",[e._v("You'll need some ghūl source files. By convention ghūl source files have the extension "),t("code",[e._v(".ghul")]),e._v(", and the standard MSBuild targets will include "),t("code",[e._v("**/*.ghul")]),e._v(" when building.")]),e._v(" "),t("h3",{attrs:{id:"building-and-running"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#building-and-running"}},[e._v("#")]),e._v(" building and running")]),e._v(" "),t("p",[e._v("Once you have a project file and some ghūl source files, you can use the normal\n.NET SDK commands to build, pack, and run your project:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{staticClass:"language-bash"},[t("code",{staticClass:"language-bash"},[e._v("dotnet build\n")])])]),t("div",{staticClass:"language-bash extra-class"},[t("pre",{staticClass:"language-bash"},[t("code",{staticClass:"language-bash"},[e._v("dotnet pack\n")])])]),t("div",{staticClass:"language-bash extra-class"},[t("pre",{staticClass:"language-bash"},[t("code",{staticClass:"language-bash"},[e._v("dotnet run\n")])])]),t("h3",{attrs:{id:"runtime-dependencies-for-ghul-applications"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#runtime-dependencies-for-ghul-applications"}},[e._v("#")]),e._v(" runtime dependencies for ghūl applications")]),e._v(" "),t("p",[e._v("Applications written in ghūl require the "),t("a",{attrs:{href:"https://dotnet.microsoft.com/download/dotnet/8.0",target:"_blank",rel:"noopener noreferrer"}},[e._v(".NET 8.0"),t("OutboundLink")],1),e._v(" runtime")]),e._v(" "),t("h2",{attrs:{id:"development-environment"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#development-environment"}},[e._v("#")]),e._v(" development environment")]),e._v(" "),t("h3",{attrs:{id:"visual-studio-code"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#visual-studio-code"}},[e._v("#")]),e._v(" Visual Studio Code")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://code.visualstudio.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("Visual Studio Code"),t("OutboundLink")],1),e._v(" will give you rich language support via the "),t("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=degory.ghul",target:"_blank",rel:"noopener noreferrer"}},[e._v("ghūl VSCode language extension"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("h3",{attrs:{id:"other-editors"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#other-editors"}},[e._v("#")]),e._v(" Other editors")]),e._v(" "),t("p",[e._v("The "),t("a",{attrs:{href:"https://github.com/degory/ghul-vsce",target:"_blank",rel:"noopener noreferrer"}},[e._v("ghūl language extension implementation"),t("OutboundLink")],1),e._v(" is currently tightly coupled to the Visual Studio Code extension API. However under the hood it is using the "),t("a",{attrs:{href:"https://microsoft.github.io/language-server-protocol/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Language Server Protocol"),t("OutboundLink")],1),e._v(" as so could be extended to support other clients. Feel free to submit a PR.")])])}),[],!1,null,null,null);t.default=o.exports}}]);