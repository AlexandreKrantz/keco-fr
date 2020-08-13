/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  "JANRA19K71",
  "a345491e56ba7434a97d791f379a5a0b"
);

const search = instantsearch({
  indexName: "bcorp",
  searchClient,
  routing: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search for an item",
    showReset: false,
    showSubmit: false,
    cssClasses: {
      input: "form-control form-control-lg",
    },
    templates: {
      submit: "",
    },
  }),

  instantsearch.widgets.refinementList({
    container: "#category",
    attribute: "categories",
    showMore: true,
    cssClasses: {
      item: "list-group-item list-group-item-action",
      list: "list-group-flush",
      showMore: "btn btn-outline-secondary btn-block",
      count: "badge badge-pill badge-light",
      selectedItem: "active",
      disabledShowMore: "d-none",
      checkbox: "d-none",
    },
  }),
  instantsearch.widgets.refinementList({
    container: "#location",
    attribute: "location",
    showMore: true,
    cssClasses: {
      item: "list-group-item list-group-item-action",
      list: "list-group-flush",
      showMore: "btn btn-outline-secondary btn-block",
      count: "badge badge-pill badge-light",
      selectedItem: "active",
      disabledShowMore: "d-none",
      checkbox: "d-none",
    },
  }),

  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: `
        <div class="hit-template card">
        <div class="card-body row">
            <div class="col-sm-4" id="hit-image">
              <a href="{{url}}" target="_blank"> 
                <img src="{{image}}" alt="{{name}}" class="rounded img-fluid" />
              </a>
            </div>

            <div class="col-sm-8">
              <div class="hit-name card-title">
                <h5><a href="{{url}}" target="_blank">{{name}}</a> <a href="{{BCORP_url}}"><span class="hit-rating badge badge-secondary float-right">\{{Overall}}</span></a></h5>
              </div>

              <div class="hit-description card-text">
                <p>{{description}}</p>
              </div>
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
    container: "#pagination",
    showFirst: true,
    showLast: true,
    scrollTo: "#searchbox",
    cssClasses: {
      root: "MyCustomPagination",
      list: "pagination",
      item: "page-item",
      link: "page-link",
    },
  }),
]);

search.start();
