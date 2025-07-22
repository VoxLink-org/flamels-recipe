(() => {
  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t4, e7, o6) {
      if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t4, this.t = e7;
    }
    get styleSheet() {
      let t4 = this.o;
      const s4 = this.t;
      if (e && void 0 === t4) {
        const e7 = void 0 !== s4 && 1 === s4.length;
        e7 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && o.set(s4, t4));
      }
      return t4;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
  var i = (t4, ...e7) => {
    const o6 = 1 === t4.length ? t4[0] : e7.reduce((e8, s4, o7) => e8 + ((t5) => {
      if (true === t5._$cssResult$) return t5.cssText;
      if ("number" == typeof t5) return t5;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s4) + t4[o7 + 1], t4[0]);
    return new n(o6, t4, s);
  };
  var S = (s4, o6) => {
    if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
    else for (const e7 of o6) {
      const o7 = document.createElement("style"), n4 = t.litNonce;
      void 0 !== n4 && o7.setAttribute("nonce", n4), o7.textContent = e7.cssText, s4.appendChild(o7);
    }
  };
  var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
    let e7 = "";
    for (const s4 of t5.cssRules) e7 += s4.cssText;
    return r(e7);
  })(t4) : t4;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t4, s4) => t4;
  var u = { toAttribute(t4, s4) {
    switch (s4) {
      case Boolean:
        t4 = t4 ? l : null;
        break;
      case Object:
      case Array:
        t4 = null == t4 ? t4 : JSON.stringify(t4);
    }
    return t4;
  }, fromAttribute(t4, s4) {
    let i6 = t4;
    switch (s4) {
      case Boolean:
        i6 = null !== t4;
        break;
      case Number:
        i6 = null === t4 ? null : Number(t4);
        break;
      case Object:
      case Array:
        try {
          i6 = JSON.parse(t4);
        } catch (t5) {
          i6 = null;
        }
    }
    return i6;
  } };
  var f = (t4, s4) => !i2(t4, s4);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var y = class extends HTMLElement {
    static addInitializer(t4) {
      this._$Ei(), (this.l ??= []).push(t4);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t4, s4 = b) {
      if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
        const i6 = Symbol(), h3 = this.getPropertyDescriptor(t4, i6, s4);
        void 0 !== h3 && e2(this.prototype, t4, h3);
      }
    }
    static getPropertyDescriptor(t4, s4, i6) {
      const { get: e7, set: r4 } = h(this.prototype, t4) ?? { get() {
        return this[s4];
      }, set(t5) {
        this[s4] = t5;
      } };
      return { get: e7, set(s5) {
        const h3 = e7?.call(this);
        r4?.call(this, s5), this.requestUpdate(t4, h3, i6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t4) {
      return this.elementProperties.get(t4) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t4 = n2(this);
      t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
        for (const i6 of s4) this.createProperty(i6, t5[i6]);
      }
      const t4 = this[Symbol.metadata];
      if (null !== t4) {
        const s4 = litPropertyMetadata.get(t4);
        if (void 0 !== s4) for (const [t5, i6] of s4) this.elementProperties.set(t5, i6);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t5, s4] of this.elementProperties) {
        const i6 = this._$Eu(t5, s4);
        void 0 !== i6 && this._$Eh.set(i6, t5);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s4) {
      const i6 = [];
      if (Array.isArray(s4)) {
        const e7 = new Set(s4.flat(1 / 0).reverse());
        for (const s5 of e7) i6.unshift(c(s5));
      } else void 0 !== s4 && i6.push(c(s4));
      return i6;
    }
    static _$Eu(t4, s4) {
      const i6 = s4.attribute;
      return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
    }
    addController(t4) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
    }
    removeController(t4) {
      this._$EO?.delete(t4);
    }
    _$E_() {
      const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
      for (const i6 of s4.keys()) this.hasOwnProperty(i6) && (t4.set(i6, this[i6]), delete this[i6]);
      t4.size > 0 && (this._$Ep = t4);
    }
    createRenderRoot() {
      const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t4, this.constructor.elementStyles), t4;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
    }
    enableUpdating(t4) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t4) => t4.hostDisconnected?.());
    }
    attributeChangedCallback(t4, s4, i6) {
      this._$AK(t4, i6);
    }
    _$ET(t4, s4) {
      const i6 = this.constructor.elementProperties.get(t4), e7 = this.constructor._$Eu(t4, i6);
      if (void 0 !== e7 && true === i6.reflect) {
        const h3 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u).toAttribute(s4, i6.type);
        this._$Em = t4, null == h3 ? this.removeAttribute(e7) : this.setAttribute(e7, h3), this._$Em = null;
      }
    }
    _$AK(t4, s4) {
      const i6 = this.constructor, e7 = i6._$Eh.get(t4);
      if (void 0 !== e7 && this._$Em !== e7) {
        const t5 = i6.getPropertyOptions(e7), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
        this._$Em = e7;
        const r4 = h3.fromAttribute(s4, t5.type);
        this[e7] = r4 ?? this._$Ej?.get(e7) ?? r4, this._$Em = null;
      }
    }
    requestUpdate(t4, s4, i6) {
      if (void 0 !== t4) {
        const e7 = this.constructor, h3 = this[t4];
        if (i6 ??= e7.getPropertyOptions(t4), !((i6.hasChanged ?? f)(h3, s4) || i6.useDefault && i6.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(e7._$Eu(t4, i6)))) return;
        this.C(t4, s4, i6);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t4, s4, { useDefault: i6, reflect: e7, wrapped: h3 }, r4) {
      i6 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t4) && (this._$Ej.set(t4, r4 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r4) || (this._$AL.has(t4) || (this.hasUpdated || i6 || (s4 = void 0), this._$AL.set(t4, s4)), true === e7 && this._$Em !== t4 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t4));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t5) {
        Promise.reject(t5);
      }
      const t4 = this.scheduleUpdate();
      return null != t4 && await t4, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t6, s5] of this._$Ep) this[t6] = s5;
          this._$Ep = void 0;
        }
        const t5 = this.constructor.elementProperties;
        if (t5.size > 0) for (const [s5, i6] of t5) {
          const { wrapped: t6 } = i6, e7 = this[s5];
          true !== t6 || this._$AL.has(s5) || void 0 === e7 || this.C(s5, void 0, i6, e7);
        }
      }
      let t4 = false;
      const s4 = this._$AL;
      try {
        t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
      } catch (s5) {
        throw t4 = false, this._$EM(), s5;
      }
      t4 && this._$AE(s4);
    }
    willUpdate(t4) {
    }
    _$AE(t4) {
      this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t4) {
      return true;
    }
    update(t4) {
      this._$Eq &&= this._$Eq.forEach((t5) => this._$ET(t5, this[t5])), this._$EM();
    }
    updated(t4) {
    }
    firstUpdated(t4) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.1");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = t2.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
  var a2 = Array.isArray;
  var u2 = (t4) => a2(t4) || "function" == typeof t4?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t4) => (i6, ...s4) => ({ _$litType$: t4, strings: i6, values: s4 });
  var x = y2(1);
  var b2 = y2(2);
  var w = y2(3);
  var T = Symbol.for("lit-noChange");
  var E = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129);
  function P(t4, i6) {
    if (!a2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i6) : i6;
  }
  var V = (t4, i6) => {
    const s4 = t4.length - 1, o6 = [];
    let r4, l3 = 2 === i6 ? "<svg>" : 3 === i6 ? "<math>" : "", c4 = f2;
    for (let i7 = 0; i7 < s4; i7++) {
      const s5 = t4[i7];
      let a3, u3, d3 = -1, y3 = 0;
      for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); ) y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r4 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r4 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r4 = void 0);
      const x2 = c4 === m && t4[i7 + 1].startsWith("/>") ? " " : "";
      l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o6.push(a3), s5.slice(0, d3) + e3 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i7 : x2);
    }
    return [P(t4, l3 + (t4[s4] || "<?>") + (2 === i6 ? "</svg>" : 3 === i6 ? "</math>" : "")), o6];
  };
  var N = class _N {
    constructor({ strings: t4, _$litType$: s4 }, n4) {
      let r4;
      this.parts = [];
      let c4 = 0, a3 = 0;
      const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = V(t4, s4);
      if (this.el = _N.createElement(f3, n4), C.currentNode = this.el.content, 2 === s4 || 3 === s4) {
        const t5 = this.el.content.firstChild;
        t5.replaceWith(...t5.childNodes);
      }
      for (; null !== (r4 = C.nextNode()) && d3.length < u3; ) {
        if (1 === r4.nodeType) {
          if (r4.hasAttributes()) for (const t5 of r4.getAttributeNames()) if (t5.endsWith(e3)) {
            const i6 = v2[a3++], s5 = r4.getAttribute(t5).split(h2), e7 = /([.?@])?(.*)/.exec(i6);
            d3.push({ type: 1, index: c4, name: e7[2], strings: s5, ctor: "." === e7[1] ? H : "?" === e7[1] ? I : "@" === e7[1] ? L : k }), r4.removeAttribute(t5);
          } else t5.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r4.removeAttribute(t5));
          if ($.test(r4.tagName)) {
            const t5 = r4.textContent.split(h2), s5 = t5.length - 1;
            if (s5 > 0) {
              r4.textContent = i3 ? i3.emptyScript : "";
              for (let i6 = 0; i6 < s5; i6++) r4.append(t5[i6], l2()), C.nextNode(), d3.push({ type: 2, index: ++c4 });
              r4.append(t5[s5], l2());
            }
          }
        } else if (8 === r4.nodeType) if (r4.data === o3) d3.push({ type: 2, index: c4 });
        else {
          let t5 = -1;
          for (; -1 !== (t5 = r4.data.indexOf(h2, t5 + 1)); ) d3.push({ type: 7, index: c4 }), t5 += h2.length - 1;
        }
        c4++;
      }
    }
    static createElement(t4, i6) {
      const s4 = r3.createElement("template");
      return s4.innerHTML = t4, s4;
    }
  };
  function S2(t4, i6, s4 = t4, e7) {
    if (i6 === T) return i6;
    let h3 = void 0 !== e7 ? s4._$Co?.[e7] : s4._$Cl;
    const o6 = c3(i6) ? void 0 : i6._$litDirective$;
    return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e7)), void 0 !== e7 ? (s4._$Co ??= [])[e7] = h3 : s4._$Cl = h3), void 0 !== h3 && (i6 = S2(t4, h3._$AS(t4, i6.values), h3, e7)), i6;
  }
  var M = class {
    constructor(t4, i6) {
      this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i6;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t4) {
      const { el: { content: i6 }, parts: s4 } = this._$AD, e7 = (t4?.creationScope ?? r3).importNode(i6, true);
      C.currentNode = e7;
      let h3 = C.nextNode(), o6 = 0, n4 = 0, l3 = s4[0];
      for (; void 0 !== l3; ) {
        if (o6 === l3.index) {
          let i7;
          2 === l3.type ? i7 = new R(h3, h3.nextSibling, this, t4) : 1 === l3.type ? i7 = new l3.ctor(h3, l3.name, l3.strings, this, t4) : 6 === l3.type && (i7 = new z(h3, this, t4)), this._$AV.push(i7), l3 = s4[++n4];
        }
        o6 !== l3?.index && (h3 = C.nextNode(), o6++);
      }
      return C.currentNode = r3, e7;
    }
    p(t4) {
      let i6 = 0;
      for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i6), i6 += s4.strings.length - 2) : s4._$AI(t4[i6])), i6++;
    }
  };
  var R = class _R {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t4, i6, s4, e7) {
      this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t4, this._$AB = i6, this._$AM = s4, this.options = e7, this._$Cv = e7?.isConnected ?? true;
    }
    get parentNode() {
      let t4 = this._$AA.parentNode;
      const i6 = this._$AM;
      return void 0 !== i6 && 11 === t4?.nodeType && (t4 = i6.parentNode), t4;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t4, i6 = this) {
      t4 = S2(this, t4, i6), c3(t4) ? t4 === E || null == t4 || "" === t4 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t4 !== this._$AH && t4 !== T && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : u2(t4) ? this.k(t4) : this._(t4);
    }
    O(t4) {
      return this._$AA.parentNode.insertBefore(t4, this._$AB);
    }
    T(t4) {
      this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
    }
    _(t4) {
      this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(r3.createTextNode(t4)), this._$AH = t4;
    }
    $(t4) {
      const { values: i6, _$litType$: s4 } = t4, e7 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = N.createElement(P(s4.h, s4.h[0]), this.options)), s4);
      if (this._$AH?._$AD === e7) this._$AH.p(i6);
      else {
        const t5 = new M(e7, this), s5 = t5.u(this.options);
        t5.p(i6), this.T(s5), this._$AH = t5;
      }
    }
    _$AC(t4) {
      let i6 = A.get(t4.strings);
      return void 0 === i6 && A.set(t4.strings, i6 = new N(t4)), i6;
    }
    k(t4) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i6 = this._$AH;
      let s4, e7 = 0;
      for (const h3 of t4) e7 === i6.length ? i6.push(s4 = new _R(this.O(l2()), this.O(l2()), this, this.options)) : s4 = i6[e7], s4._$AI(h3), e7++;
      e7 < i6.length && (this._$AR(s4 && s4._$AB.nextSibling, e7), i6.length = e7);
    }
    _$AR(t4 = this._$AA.nextSibling, i6) {
      for (this._$AP?.(false, true, i6); t4 !== this._$AB; ) {
        const i7 = t4.nextSibling;
        t4.remove(), t4 = i7;
      }
    }
    setConnected(t4) {
      void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
    }
  };
  var k = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t4, i6, s4, e7, h3) {
      this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t4, this.name = i6, this._$AM = e7, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = E;
    }
    _$AI(t4, i6 = this, s4, e7) {
      const h3 = this.strings;
      let o6 = false;
      if (void 0 === h3) t4 = S2(this, t4, i6, 0), o6 = !c3(t4) || t4 !== this._$AH && t4 !== T, o6 && (this._$AH = t4);
      else {
        const e8 = t4;
        let n4, r4;
        for (t4 = h3[0], n4 = 0; n4 < h3.length - 1; n4++) r4 = S2(this, e8[s4 + n4], i6, n4), r4 === T && (r4 = this._$AH[n4]), o6 ||= !c3(r4) || r4 !== this._$AH[n4], r4 === E ? t4 = E : t4 !== E && (t4 += (r4 ?? "") + h3[n4 + 1]), this._$AH[n4] = r4;
      }
      o6 && !e7 && this.j(t4);
    }
    j(t4) {
      t4 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t4) {
      this.element[this.name] = t4 === E ? void 0 : t4;
    }
  };
  var I = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t4) {
      this.element.toggleAttribute(this.name, !!t4 && t4 !== E);
    }
  };
  var L = class extends k {
    constructor(t4, i6, s4, e7, h3) {
      super(t4, i6, s4, e7, h3), this.type = 5;
    }
    _$AI(t4, i6 = this) {
      if ((t4 = S2(this, t4, i6, 0) ?? E) === T) return;
      const s4 = this._$AH, e7 = t4 === E && s4 !== E || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== E && (s4 === E || e7);
      e7 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
    }
    handleEvent(t4) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
    }
  };
  var z = class {
    constructor(t4, i6, s4) {
      this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s4;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4) {
      S2(this, t4);
    }
  };
  var j = t2.litHtmlPolyfillSupport;
  j?.(N, R), (t2.litHtmlVersions ??= []).push("3.3.1");
  var B = (t4, i6, s4) => {
    const e7 = s4?.renderBefore ?? i6;
    let h3 = e7._$litPart$;
    if (void 0 === h3) {
      const t5 = s4?.renderBefore ?? null;
      e7._$litPart$ = h3 = new R(i6.insertBefore(l2(), t5), t5, void 0, s4 ?? {});
    }
    return h3._$AI(t4), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t4 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t4.firstChild, t4;
    }
    update(t4) {
      const r4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = B(r4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  var o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.1");

  // node_modules/lit-html/directive.js
  var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e4 = (t4) => (...e7) => ({ _$litDirective$: t4, values: e7 });
  var i5 = class {
    constructor(t4) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t4, e7, i6) {
      this._$Ct = t4, this._$AM = e7, this._$Ci = i6;
    }
    _$AS(t4, e7) {
      return this.update(t4, e7);
    }
    update(t4, e7) {
      return this.render(...e7);
    }
  };

  // node_modules/lit-html/directives/unsafe-html.js
  var e5 = class extends i5 {
    constructor(i6) {
      if (super(i6), this.it = E, i6.type !== t3.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r4) {
      if (r4 === E || null == r4) return this._t = void 0, this.it = r4;
      if (r4 === T) return r4;
      if ("string" != typeof r4) throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (r4 === this.it) return this._t;
      this.it = r4;
      const s4 = [r4];
      return s4.raw = s4, this._t = { _$litType$: this.constructor.resultType, strings: s4, values: [] };
    }
  };
  e5.directiveName = "unsafeHTML", e5.resultType = 1;
  var o5 = e4(e5);

  // node_modules/lit-html/directives/class-map.js
  var e6 = e4(class extends i5 {
    constructor(t4) {
      if (super(t4), t4.type !== t3.ATTRIBUTE || "class" !== t4.name || t4.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t4) {
      return " " + Object.keys(t4).filter((s4) => t4[s4]).join(" ") + " ";
    }
    update(s4, [i6]) {
      if (void 0 === this.st) {
        this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t4) => "" !== t4)));
        for (const t4 in i6) i6[t4] && !this.nt?.has(t4) && this.st.add(t4);
        return this.render(i6);
      }
      const r4 = s4.element.classList;
      for (const t4 of this.st) t4 in i6 || (r4.remove(t4), this.st.delete(t4));
      for (const t4 in i6) {
        const s5 = !!i6[t4];
        s5 === this.st.has(t4) || this.nt?.has(t4) || (s5 ? (r4.add(t4), this.st.add(t4)) : (r4.remove(t4), this.st.delete(t4)));
      }
      return T;
    }
  });

  // src/webcomponents/site-header.js
  var arrowUpRightIcon = o5(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`);
  var tailwindStyles = i`${r('.prose>:first-child{margin-top:0!important}.prose>:last-child{margin-bottom:0!important}.prose h1,.prose h2,.prose h3,.prose h4,.prose h5,.prose h6{scroll-margin:4rem;font-weight:600;letter-spacing:-.025em}.prose h1,.prose h2,.prose h3{margin-top:1.5rem;margin-bottom:1.5rem}.prose h1{font-size:1.875rem;line-height:2.25rem}@media (min-width:1024px){.prose h1{font-size:2.25rem;line-height:2.5rem}}.prose h2{font-size:1.25rem;line-height:1.75rem}@media (min-width:1024px){.prose h2{font-size:1.5rem;line-height:2rem}}.prose h3{font-size:1rem;line-height:1.5rem}@media (min-width:1024px){.prose h3{font-size:1.125rem;line-height:1.75rem}}.prose h4,.prose h5,.prose h6{margin-top:1rem;margin-bottom:1rem;font-size:1rem;line-height:1.5rem}.prose blockquote,.prose ol,.prose p,.prose ul{margin-top:1.5rem;margin-bottom:1.5rem}.prose blockquote:first-child,.prose ol:first-child,.prose p:first-child,.prose ul:first-child{margin-top:0}.prose code{border-radius:calc(var(--radius) - 4px);background-color:hsl(var(--muted));padding:.25rem .375rem;font-size:90%}.prose pre code{display:block;white-space:pre-wrap;overflow-wrap:break-word;padding:.5rem}.prose ol,.prose ul{margin-bottom:1rem;padding-left:1.25rem}.prose ol li,.prose ul li{margin-top:.5rem;margin-bottom:.5rem}.prose ol li:first-child,.prose ul li:first-child{margin-top:0}.prose ol li:last-child,.prose ul li:last-child{margin-bottom:0}.prose ol li>p,.prose ul li>p{margin:0}.prose ol li ol,.prose ol li ul,.prose ul li ol,.prose ul li ul{margin-top:.5rem;margin-bottom:.5rem}.prose ul{list-style-type:disc}.prose ol{list-style-type:decimal}.prose a{color:hsl(var(--primary));text-decoration-line:underline;text-underline-offset:2px}.prose a:hover{text-decoration-color:hsl(var(--muted-foreground))}.prose blockquote{margin-left:.25rem;border-left-width:2px;padding-left:1rem}.prose audio,.prose canvas,.prose embed,.prose iframe,.prose img,.prose object,.prose svg,.prose video{display:inline-block}.prose table{display:table;font-size:.875rem;line-height:1.25rem}.prose table tr{border-bottom-width:1px}.prose table th{height:3rem;padding-left:.75rem;padding-right:.75rem;text-align:left;vertical-align:middle;font-size:.75rem;line-height:1rem;font-weight:500;color:hsl(var(--muted-foreground))}.prose table th:first-child{padding-left:0}.prose table th:last-child{padding-right:0}.prose table td{padding:.75rem;vertical-align:middle}.prose table td:first-child{padding-left:0}.prose table td:last-child{padding-right:0}.prose table td strong code{font-weight:500;--tw-text-opacity:1;color:rgb(0 92 197/var(--tw-text-opacity,1))}html.dark .prose table td strong code{font-weight:500;--tw-text-opacity:1;color:rgb(121 192 255/var(--tw-text-opacity,1))}@keyframes scroll{0%{transform:translateX(0)}to{transform:translateX(-720px)}}.infinite-scroll{animation:scroll 20s linear infinite}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }\n\n/*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:root{--background:0 0% 100%;--foreground:0 0% 3.9%;--card:0 0% 100%;--card-foreground:0 0% 3.9%;--popover:0 0% 100%;--popover-foreground:0 0% 3.9%;--primary:0 0% 9%;--primary-foreground:0 0% 98%;--secondary:0 0% 96.1%;--secondary-foreground:0 0% 9%;--muted:0 0% 96.1%;--muted-foreground:0 0% 45.1%;--accent:0 0% 96.1%;--accent-foreground:0 0% 9%;--destructive:0 84.2% 60.2%;--destructive-foreground:0 0% 98%;--border:0 0% 85.8%;--input:0 0% 85.8%;--ring:0 0% 3.9%;--radius:0.75rem}.dark{--background:0 0% 3.9%;--foreground:0 0% 98%;--card:0 0% 3.9%;--card-foreground:0 0% 98%;--popover:0 0% 3.9%;--popover-foreground:0 0% 98%;--primary:0 0% 98%;--primary-foreground:0 0% 9%;--secondary:0 0% 14.9%;--secondary-foreground:0 0% 98%;--muted:0 0% 14.9%;--muted-foreground:0 0% 63.9%;--accent:0 0% 14.9%;--accent-foreground:0 0% 98%;--destructive:0 62.8% 30.6%;--destructive-foreground:0 0% 98%;--border:0 0% 19.9%;--input:0 0% 19.9%;--ring:0 0% 83.1%}*{border-color:hsl(var(--border))}body{background-color:hsl(var(--background));color:hsl(var(--foreground))}.static{position:static}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.left-1\\/2{left:50%}.top-0{top:0}.top-1\\/2{top:50%}.top-16{top:4rem}.z-50{z-index:50}.mx-auto{margin-left:auto;margin-right:auto}.my-16{margin-top:4rem;margin-bottom:4rem}.my-24{margin-top:6rem;margin-bottom:6rem}.my-8{margin-top:2rem;margin-bottom:2rem}.\\!mb-8{margin-bottom:2rem!important}.-ml-1{margin-left:-.25rem}.mb-12{margin-bottom:3rem}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.ml-auto{margin-left:auto}.mt-8{margin-top:2rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.\\!h-12{height:3rem!important}.h-3{height:.75rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-8{height:2rem}.max-h-0{max-height:0}.w-3{width:.75rem}.w-4{width:1rem}.w-5{width:1.25rem}.w-64{width:16rem}.w-full{width:100%}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-6xl{max-width:72rem}.max-w-7xl{max-width:80rem}.max-w-xl{max-width:36rem}.shrink-0{flex-shrink:0}.grow{flex-grow:1}.-translate-x-1\\/2{--tw-translate-x:-50%}.-translate-x-1\\/2,.-translate-y-1\\/2{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y:-50%}.rotate-180{--tw-rotate:180deg}.rotate-180,.rotate-90{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-90{--tw-rotate:90deg}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.gap-x-1{-moz-column-gap:.25rem;column-gap:.25rem}.gap-x-2{-moz-column-gap:.5rem;column-gap:.5rem}.gap-x-3{-moz-column-gap:.75rem;column-gap:.75rem}.gap-x-4{-moz-column-gap:1rem;column-gap:1rem}.gap-x-8{-moz-column-gap:2rem;column-gap:2rem}.gap-y-1{row-gap:.25rem}.gap-y-4{row-gap:1rem}.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2rem*(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem*var(--tw-space-y-reverse))}.overflow-hidden,.truncate{overflow:hidden}.truncate{text-overflow:ellipsis;white-space:nowrap}.\\!rounded-full{border-radius:9999px!important}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:var(--radius)}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.bg-background{background-color:hsl(var(--background))}.bg-muted{background-color:hsl(var(--muted))}.bg-neutral-950{--tw-bg-opacity:1;background-color:rgb(10 10 10/var(--tw-bg-opacity,1))}.p-4{padding:1rem}.\\!px-8{padding-left:2rem!important;padding-right:2rem!important}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-4{padding-bottom:1rem}.pt-4,.py-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.text-center{text-align:center}.font-inter{font-family:Inter,sans-serif}.\\!text-base{font-size:1rem!important;line-height:1.5rem!important}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-base{font-size:1rem;line-height:1.5rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.font-medium{font-weight:500}.font-semibold{font-weight:600}.capitalize{text-transform:capitalize}.tracking-tight{letter-spacing:-.025em}.\\!text-primary{color:hsl(var(--primary))!important}.text-muted-foreground{color:hsl(var(--muted-foreground))}.text-primary{color:hsl(var(--primary))}.underline-offset-2{text-underline-offset:2px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.outline-none{outline:2px solid transparent;outline-offset:2px}.\\!transition-transform{transition-property:transform!important;transition-timing-function:cubic-bezier(.4,0,.2,1)!important;transition-duration:.15s!important}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-1000{transition-duration:1s}.duration-200{transition-duration:.2s}.button{display:inline-flex;height:2.5rem;align-items:center;justify-content:center;white-space:nowrap;border-radius:calc(var(--radius) - 2px);background-color:hsl(var(--primary));padding:.5rem 1rem;font-size:.875rem;line-height:1.25rem;font-weight:500;color:hsl(var(--primary-foreground));--tw-ring-offset-color:hsl(var(--background));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.button:hover{background-color:hsl(var(--primary)/.9)}.button:focus-visible{outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);--tw-ring-color:hsl(var(--ring));--tw-ring-offset-width:2px}.button:disabled{pointer-events:none;opacity:.5}.button-outline{display:inline-flex;height:2.5rem;align-items:center;justify-content:center;white-space:nowrap;border-radius:calc(var(--radius) - 2px);border-width:1px;border-color:hsl(var(--input));background-color:hsl(var(--background));padding:.5rem 1rem;font-size:.875rem;line-height:1.25rem;font-weight:500;--tw-ring-offset-color:hsl(var(--background));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.button-outline:hover{background-color:hsl(var(--accent));color:hsl(var(--accent-foreground))}.button-outline:focus-visible{outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);--tw-ring-color:hsl(var(--ring));--tw-ring-offset-width:2px}.button-outline:disabled{pointer-events:none;opacity:.5}.navigation ul ul{padding-left:1rem;padding-top:1rem}.toc li{margin-top:.5rem}.toc a{color:hsl(var(--primary));text-decoration-line:underline;text-underline-offset:2px}.toc a:hover{text-decoration-color:hsl(var(--muted-foreground))}.toc ol ol{padding-left:1rem}.hover\\:text-inherit:hover{color:inherit}.hover\\:text-primary:hover{color:hsl(var(--primary))}.hover\\:underline:hover{text-decoration-line:underline}.group:hover .group-hover\\:scale-105{--tw-scale-x:1.05;--tw-scale-y:1.05;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:text-inherit{color:inherit}.group:hover .group-hover\\:opacity-90{opacity:.9}.dark\\:block:is(.dark *){display:block}.dark\\:hidden:is(.dark *){display:none}@media not all and (min-width:1024px){.max-lg\\:hidden{display:none}}@media not all and (min-width:768px){.max-md\\:mb-4{margin-bottom:1rem}.max-md\\:max-h-0{max-height:0}.max-md\\:flex-col{flex-direction:column}.max-md\\:gap-y-4{row-gap:1rem}.max-md\\:rounded-md{border-radius:calc(var(--radius) - 2px)}.max-md\\:border{border-width:1px}.max-md\\:p-4{padding:1rem}.max-md\\:text-sm{font-size:.875rem;line-height:1.25rem}}@media not all and (min-width:640px){.max-sm\\:hidden{display:none}.max-sm\\:h-4{height:1rem}.max-sm\\:w-4{width:1rem}}@media (min-width:640px){.sm\\:inline-block{display:inline-block}.sm\\:hidden{display:none}}@media (min-width:768px){.md\\:hidden{display:none}.md\\:w-80{width:20rem}.md\\:gap-x-4{-moz-column-gap:1rem;column-gap:1rem}.md\\:border-r{border-right-width:1px}.md\\:pr-8{padding-right:2rem}.md\\:text-lg{font-size:1.125rem;line-height:1.75rem}.md\\:text-sm{font-size:.875rem;line-height:1.25rem}}@media (min-width:1024px){.lg\\:my-12{margin-top:3rem;margin-bottom:3rem}.lg\\:my-24{margin-top:6rem;margin-bottom:6rem}.lg\\:my-28{margin-top:7rem;margin-bottom:7rem}.lg\\:p-6{padding:1.5rem}.lg\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:py-3{padding-top:.75rem;padding-bottom:.75rem}.lg\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.lg\\:text-6xl{font-size:3.75rem;line-height:1}.lg\\:text-lg{font-size:1.125rem;line-height:1.75rem}}')}`;
  var SiteHeader = class extends i4 {
    // 1. 定义组件需要从外部接收的属性
    static properties = {
      sitePath: { type: String },
      // 对应 {{ site.path }}
      pageUrl: { type: String }
      // 对应 {{ page.url }}
    };
    // 2. 样式可以直接从您的 Tailwind/CSS 文件中获得，这里我们不添加额外样式
    static styles = tailwindStyles;
    constructor() {
      super();
      this.sitePath = "/";
      this.pageUrl = "/";
    }
    // 3. 将 NJK 的 HTML 和逻辑翻译到 render 方法中
    render() {
      const aboutClasses = {
        "text-sm": true,
        "font-medium": true,
        "text-muted-foreground": true,
        "hover:text-primary": true,
        "!text-primary": location.hostname === "chat.findata-be.uk"
        // NJK: if page.url == '/docs/about/'
      };
      const blogsClasses = {
        "text-sm": true,
        "font-medium": true,
        "text-muted-foreground": true,
        "hover:text-primary": true,
        "!text-primary": this.pageUrl.includes("/docs")
        // NJK: if '/docs' in page.url
      };
      return x`
      <header class="border-b flex items-center gap-x-4 py-2 px-4 lg:py-3 lg:px-6 mx-auto sticky top-0 w-full bg-background z-50">
        <a class="inline-flex items-center" href="${this.sitePath}">
          <img class="max-sm:h-4 max-sm:w-4 h-5 w-5" src="${this.sitePath}/favicon-32x32.png" />
          <span class="hidden sm:inline-block ml-2 text-sm font-semibold">Flamel's recipe</span>
        </a>
        <a class="ml-auto ${e6(aboutClasses)}" href="https://chat.findata-be.uk">
          Chat
        </a>
        <a class="${e6(blogsClasses)}" href="${this.sitePath}/docs">
          Blogs
        </a>
        <a class="flex gap-x-1 items-center text-sm font-medium text-muted-foreground hover:text-primary" href="https://t.me/finance_tools_mcp" target="_blank">
          Telegram
          ${arrowUpRightIcon}
        </a>
      </header>
    `;
    }
  };
  customElements.define("site-header", SiteHeader);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=site-header.js.map
