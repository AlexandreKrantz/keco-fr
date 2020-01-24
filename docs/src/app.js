/* global algoliasearch instantsearch */

const searchClient = algoliasearch('JANRA19K71', 'a345491e56ba7434a97d791f379a5a0b');

const search = instantsearch({
  indexName: 'bcorp',
  searchClient,
  routing:true

});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for an item',
  }),
  	
  
  instantsearch.widgets.refinementList({
    container: '#category',
    attribute: 'categories',
  }),
  instantsearch.widgets.refinementList({
    container: '#location',
    attribute: 'location',
  }),

instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div class="hit-template row">
            <div class="col-sm-4" id="hit-image">
              <a href="{{url}}" target="_blank"> 
                <img src="{{image}}" alt="{{name}}" class="rounded img-fluid" />
              </a>
            </div>

            <div class="col-sm-8">
              <div class="hit-name">
                <h5><a href="{{url}}" target="_blank">{{name}}</a> <a href="{{BCORP_url}}"><span class="hit-rating badge badge-secondary float-right">\{{Overall}}</span></a></h5>
              </div>

              <div class="hit-description">
                <p>{{description}}</p>
              </div>
            </div>
        </div>
      `,
      empty: `
        <div id="no-results-message" class="card"> 
          <div class="card-body">
            <h5 class="card-title">We couldn't find any sustainable brands that sell "{{query}}".</h5>
            <p class="card-text">Try removing a filter or changing the query. Buying it used may also be a good option.</p>
            <a href="." class="clear-all btn btn-secondary btn-md" role="button">Clear search</a>
            <a href="https://www.ebay.fr/sch/i.html?_from=R40&_sacat=0&_nkw={{query}}&_dcat=3247&rt=nc&LH_ItemCondition=2000|2500|3000" class="clear-all btn btn-success btn-md" role="button">Buy it used</a>

          </div>
        </div>
      `,
    },
  }),

  instantsearch.widgets.pagination({
    container: '#pagination',
    showFirst: true,
    showLast: true,
    scrollTo: '#searchbox',

  }),
]);

search.addWidgets([
  instantsearch.widgets.analytics({
    pushFunction(formattedParameters, state, results) {
      window.ga('set', 'page', window.location.pathname + window.location.search);
      window.ga('send', 'pageView');
    },
  })
]);


search.start();

function getTemplate(templateName) {
  
  return document.querySelector(`#${templateName}-template`).innerHTML;
  //hide elements using DOM
}

