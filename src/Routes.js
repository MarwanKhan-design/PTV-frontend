import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Page404 from './components/Page404'
import Companies from './pages/Companies'
import Products from './pages/Products'
import Quotations from './pages/Quotations'
import Bids from './pages/Bids'
import BidsByQuotation from './pages/AllQuotations'
import QuotationById from './pages/QuotationById'
import Practice from './components/Practice'
import History from './components/History'
import PurchaseEnquiry from './pages/PurchaseEnquiry'
import PurchaseEnquiryForCompany from './pages/PurchaseEnquiryForCompany'
import Navbar from './components/Navbar'

const Routes = () => {
  return (
    <>
      <Router history={History}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/companies/' component={Companies} />
          <Route exact path='/products/' component={Products} />
          <Route exact path='/quotations/' component={Quotations} />
          <Route exact path='/bids/' component={Bids} />
          <Route exact path='/all/quotations/' component={BidsByQuotation} />
          <Route
            exact
            path='/purchaseEnquiry/:quotationId'
            component={PurchaseEnquiry}
          />
          <Route
            exact
            path='/quotation/:quotationId/'
            component={QuotationById}
          />
          <Route
            exact
            path='/purchaseEnquiry/:quotationId/:companyId/'
            component={PurchaseEnquiryForCompany}
          />
          <Route exact path='/practice/' component={Practice} />

          <Route component={Page404} />
        </Switch>
      </Router>
    </>
  )
}

export default Routes
