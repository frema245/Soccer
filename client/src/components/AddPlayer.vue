<template>

  <div class="container-medium">

    <h1>Add Player</h1>


    <form>
      <fieldset>

        <div class="row">

          <legend>Legend</legend>

          <!-- first name -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="nameFirstInput">First Name</label>
            <input type="text" v-model=name_first class="form-control" placeholder="John" id="nameFirstInput">
          </div>

          <!-- last name -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="nameLastInput">Last Name</label>
            <input type="text" v-model=name_last class="form-control" placeholder="Smith" id="nameLastInput">
          </div>

          <!-- gender -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="genderInput">Gender</label>
            <select class="custom-select" id="genderInput" v-model="gender">
              <option value="male" selected>male</option>
              <option value="female">female</option>
            </select>
          </div>

          <!-- nationality -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="nationalityInput">Nationality</label>
            <select class="custom-select" id="nationalityInput" v-model="nationality">
              <option value="SE" selected>Sweden</option>
              <option v-for="country in countries" v-bind:value="country.code">
                {{ country.name }}
              </option>
            </select>
          </div>

          <!-- description -->
          <div class="form-group col-12">
            <label for="descriptionsInput">Write about yourself</label>
            <textarea class="form-control" id="descriptionsInput" rows="5" v-model="presentation"></textarea>
          </div>

          <!-- dateofbirth -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="birthDateInput">Date of birth</label>
            <input type="text" v-model=birth_date class="form-control" placeholder="YYYY-MM-DD" id="birthDateInput">
          </div>

          <!-- phone -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="phoneInput">Phone number</label>
            <input type="text" v-model=phone_number class="form-control" placeholder="Enter your phone number" id="phoneInput">
          </div>

          <!-- email -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="emailInput">Email</label>
            <input type="text" v-model=email class="form-control" placeholder="yourmail@something.com" id="emailInput">
          </div>

          <!-- skype -->
          <div class="form-group col-md-6">
            <label class="col-form-label" for="skypeInput">Skype</label>
            <input type="text" v-model=skype class="form-control" placeholder="skype username" id="skypeInput">
          </div>

          <!-- SAT -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="satInput">SAT</label>
            <input type="number" v-model=sat_score class="form-control" placeholder="sat score" id="satInput">
          </div>

          <!-- Toefl -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="toeflInput">Toefl</label>
            <input type="number" v-model=toefl_score class="form-control" placeholder="toefl score" id="toeflInput">
          </div>

          <!-- ACT -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="actInput">ACT</label>
            <input type="number" v-model=act_score class="form-control" placeholder="act score" id="actInput">
          </div>

          <!-- Height -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="cmInput">Height</label>
            <input type="number" v-model=cm class="form-control" placeholder="height in cm" id="cmInput">
          </div>

          <!-- Weight -->
          <div class="form-group col-md-4">
            <label class="col-form-label" for="kgInput">Weight</label>
            <input type="number" v-model=kg class="form-control" placeholder="weight in kg" id="kgInput">
          </div>

        </div>

        <button type="submit" @click="addPlayer" class="btn btn-primary">Submit</button>

      </fieldset>
    </form>

  </div>

  <!--

      <form>
        <fieldset>
          <legend>Legend</legend>



          <div class="form-group">
            <label class="col-form-label" for="inputDefault">Default input</label>
            <input type="text" class="form-control" placeholder="Default input" id="inputDefault">
          </div>


          <div class="form-group">
            <select class="custom-select">
              <option selected="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleTextarea">Example textarea</label>
            <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleInputFile">File input</label>
            <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
            <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>

        </fieldset>
      </form>

      <!--

      <div class="form">

        <div>
          <input type="text" name="title" placeholder="first name" v-model="name_first">
        </div>
        <div>
          <input type="text" name="title" placeholder="last name" v-model="name_last">
        </div>
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>

        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>

        <div>
          <button class="app_player_btn" @click="addPlayer">Add</button>
        </div>

      </div>

      -->

</template>

<script>
  import PlayersService from '@/services/PlayersService'

  export default {
    name: 'addplayer',
    data () {
      return {
        name_first: '',
        name_last: '',
        gender: '',
        birth_date: '',
        nationality: '',
        presentation: '',
        positions: [],
        toefl_score: null,
        sat_score: null,
        act_score: null,
        cm: null,
        kg: null,
        phone_number: '',
        email: '',
        skype: '',
        countries: [
          {name: 'Afghanistan', code: 'AF'},
          {name: 'Åland Islands', code: 'AX'},
          {name: 'Albania', code: 'AL'},
          {name: 'Algeria', code: 'DZ'},
          {name: 'American Samoa', code: 'AS'},
          {name: 'AndorrA', code: 'AD'},
          {name: 'Angola', code: 'AO'},
          {name: 'Anguilla', code: 'AI'},
          {name: 'Antarctica', code: 'AQ'},
          {name: 'Antigua and Barbuda', code: 'AG'},
          {name: 'Argentina', code: 'AR'},
          {name: 'Armenia', code: 'AM'},
          {name: 'Aruba', code: 'AW'},
          {name: 'Australia', code: 'AU'},
          {name: 'Austria', code: 'AT'},
          {name: 'Azerbaijan', code: 'AZ'},
          {name: 'Bahamas', code: 'BS'},
          {name: 'Bahrain', code: 'BH'},
          {name: 'Bangladesh', code: 'BD'},
          {name: 'Barbados', code: 'BB'},
          {name: 'Belarus', code: 'BY'},
          {name: 'Belgium', code: 'BE'},
          {name: 'Belize', code: 'BZ'},
          {name: 'Benin', code: 'BJ'},
          {name: 'Bermuda', code: 'BM'},
          {name: 'Bhutan', code: 'BT'},
          {name: 'Bolivia', code: 'BO'},
          {name: 'Bosnia and Herzegovina', code: 'BA'},
          {name: 'Botswana', code: 'BW'},
          {name: 'Bouvet Island', code: 'BV'},
          {name: 'Brazil', code: 'BR'},
          {name: 'British Indian Ocean Territory', code: 'IO'},
          {name: 'Brunei Darussalam', code: 'BN'},
          {name: 'Bulgaria', code: 'BG'},
          {name: 'Burkina Faso', code: 'BF'},
          {name: 'Burundi', code: 'BI'},
          {name: 'Cambodia', code: 'KH'},
          {name: 'Cameroon', code: 'CM'},
          {name: 'Canada', code: 'CA'},
          {name: 'Cape Verde', code: 'CV'},
          {name: 'Cayman Islands', code: 'KY'},
          {name: 'Central African Republic', code: 'CF'},
          {name: 'Chad', code: 'TD'},
          {name: 'Chile', code: 'CL'},
          {name: 'China', code: 'CN'},
          {name: 'Christmas Island', code: 'CX'},
          {name: 'Cocos (Keeling) Islands', code: 'CC'},
          {name: 'Colombia', code: 'CO'},
          {name: 'Comoros', code: 'KM'},
          {name: 'Congo', code: 'CG'},
          {name: 'Congo, The Democratic Republic of the', code: 'CD'},
          {name: 'Cook Islands', code: 'CK'},
          {name: 'Costa Rica', code: 'CR'},
          {name: 'Cote D\'Ivoire', code: 'CI'},
          {name: 'Croatia', code: 'HR'},
          {name: 'Cuba', code: 'CU'},
          {name: 'Cyprus', code: 'CY'},
          {name: 'Czech Republic', code: 'CZ'},
          {name: 'Denmark', code: 'DK'},
          {name: 'Djibouti', code: 'DJ'},
          {name: 'Dominica', code: 'DM'},
          {name: 'Dominican Republic', code: 'DO'},
          {name: 'Ecuador', code: 'EC'},
          {name: 'Egypt', code: 'EG'},
          {name: 'El Salvador', code: 'SV'},
          {name: 'Equatorial Guinea', code: 'GQ'},
          {name: 'Eritrea', code: 'ER'},
          {name: 'Estonia', code: 'EE'},
          {name: 'Ethiopia', code: 'ET'},
          {name: 'Falkland Islands (Malvinas)', code: 'FK'},
          {name: 'Faroe Islands', code: 'FO'},
          {name: 'Fiji', code: 'FJ'},
          {name: 'Finland', code: 'FI'},
          {name: 'France', code: 'FR'},
          {name: 'French Guiana', code: 'GF'},
          {name: 'French Polynesia', code: 'PF'},
          {name: 'French Southern Territories', code: 'TF'},
          {name: 'Gabon', code: 'GA'},
          {name: 'Gambia', code: 'GM'},
          {name: 'Georgia', code: 'GE'},
          {name: 'Germany', code: 'DE'},
          {name: 'Ghana', code: 'GH'},
          {name: 'Gibraltar', code: 'GI'},
          {name: 'Greece', code: 'GR'},
          {name: 'Greenland', code: 'GL'},
          {name: 'Grenada', code: 'GD'},
          {name: 'Guadeloupe', code: 'GP'},
          {name: 'Guam', code: 'GU'},
          {name: 'Guatemala', code: 'GT'},
          {name: 'Guernsey', code: 'GG'},
          {name: 'Guinea', code: 'GN'},
          {name: 'Guinea-Bissau', code: 'GW'},
          {name: 'Guyana', code: 'GY'},
          {name: 'Haiti', code: 'HT'},
          {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
          {name: 'Holy See (Vatican City State)', code: 'VA'},
          {name: 'Honduras', code: 'HN'},
          {name: 'Hong Kong', code: 'HK'},
          {name: 'Hungary', code: 'HU'},
          {name: 'Iceland', code: 'IS'},
          {name: 'India', code: 'IN'},
          {name: 'Indonesia', code: 'ID'},
          {name: 'Iran, Islamic Republic Of', code: 'IR'},
          {name: 'Iraq', code: 'IQ'},
          {name: 'Ireland', code: 'IE'},
          {name: 'Isle of Man', code: 'IM'},
          {name: 'Israel', code: 'IL'},
          {name: 'Italy', code: 'IT'},
          {name: 'Jamaica', code: 'JM'},
          {name: 'Japan', code: 'JP'},
          {name: 'Jersey', code: 'JE'},
          {name: 'Jordan', code: 'JO'},
          {name: 'Kazakhstan', code: 'KZ'},
          {name: 'Kenya', code: 'KE'},
          {name: 'Kiribati', code: 'KI'},
          {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
          {name: 'Korea, Republic of', code: 'KR'},
          {name: 'Kuwait', code: 'KW'},
          {name: 'Kyrgyzstan', code: 'KG'},
          {name: 'Lao People\'S Democratic Republic', code: 'LA'},
          {name: 'Latvia', code: 'LV'},
          {name: 'Lebanon', code: 'LB'},
          {name: 'Lesotho', code: 'LS'},
          {name: 'Liberia', code: 'LR'},
          {name: 'Libyan Arab Jamahiriya', code: 'LY'},
          {name: 'Liechtenstein', code: 'LI'},
          {name: 'Lithuania', code: 'LT'},
          {name: 'Luxembourg', code: 'LU'},
          {name: 'Macao', code: 'MO'},
          {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
          {name: 'Madagascar', code: 'MG'},
          {name: 'Malawi', code: 'MW'},
          {name: 'Malaysia', code: 'MY'},
          {name: 'Maldives', code: 'MV'},
          {name: 'Mali', code: 'ML'},
          {name: 'Malta', code: 'MT'},
          {name: 'Marshall Islands', code: 'MH'},
          {name: 'Martinique', code: 'MQ'},
          {name: 'Mauritania', code: 'MR'},
          {name: 'Mauritius', code: 'MU'},
          {name: 'Mayotte', code: 'YT'},
          {name: 'Mexico', code: 'MX'},
          {name: 'Micronesia, Federated States of', code: 'FM'},
          {name: 'Moldova, Republic of', code: 'MD'},
          {name: 'Monaco', code: 'MC'},
          {name: 'Mongolia', code: 'MN'},
          {name: 'Montserrat', code: 'MS'},
          {name: 'Morocco', code: 'MA'},
          {name: 'Mozambique', code: 'MZ'},
          {name: 'Myanmar', code: 'MM'},
          {name: 'Namibia', code: 'NA'},
          {name: 'Nauru', code: 'NR'},
          {name: 'Nepal', code: 'NP'},
          {name: 'Netherlands', code: 'NL'},
          {name: 'Netherlands Antilles', code: 'AN'},
          {name: 'New Caledonia', code: 'NC'},
          {name: 'New Zealand', code: 'NZ'},
          {name: 'Nicaragua', code: 'NI'},
          {name: 'Niger', code: 'NE'},
          {name: 'Nigeria', code: 'NG'},
          {name: 'Niue', code: 'NU'},
          {name: 'Norfolk Island', code: 'NF'},
          {name: 'Northern Mariana Islands', code: 'MP'},
          {name: 'Norway', code: 'NO'},
          {name: 'Oman', code: 'OM'},
          {name: 'Pakistan', code: 'PK'},
          {name: 'Palau', code: 'PW'},
          {name: 'Palestinian Territory, Occupied', code: 'PS'},
          {name: 'Panama', code: 'PA'},
          {name: 'Papua New Guinea', code: 'PG'},
          {name: 'Paraguay', code: 'PY'},
          {name: 'Peru', code: 'PE'},
          {name: 'Philippines', code: 'PH'},
          {name: 'Pitcairn', code: 'PN'},
          {name: 'Poland', code: 'PL'},
          {name: 'Portugal', code: 'PT'},
          {name: 'Puerto Rico', code: 'PR'},
          {name: 'Qatar', code: 'QA'},
          {name: 'Reunion', code: 'RE'},
          {name: 'Romania', code: 'RO'},
          {name: 'Russian Federation', code: 'RU'},
          {name: 'RWANDA', code: 'RW'},
          {name: 'Saint Helena', code: 'SH'},
          {name: 'Saint Kitts and Nevis', code: 'KN'},
          {name: 'Saint Lucia', code: 'LC'},
          {name: 'Saint Pierre and Miquelon', code: 'PM'},
          {name: 'Saint Vincent and the Grenadines', code: 'VC'},
          {name: 'Samoa', code: 'WS'},
          {name: 'San Marino', code: 'SM'},
          {name: 'Sao Tome and Principe', code: 'ST'},
          {name: 'Saudi Arabia', code: 'SA'},
          {name: 'Senegal', code: 'SN'},
          {name: 'Serbia and Montenegro', code: 'CS'},
          {name: 'Seychelles', code: 'SC'},
          {name: 'Sierra Leone', code: 'SL'},
          {name: 'Singapore', code: 'SG'},
          {name: 'Slovakia', code: 'SK'},
          {name: 'Slovenia', code: 'SI'},
          {name: 'Solomon Islands', code: 'SB'},
          {name: 'Somalia', code: 'SO'},
          {name: 'South Africa', code: 'ZA'},
          {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
          {name: 'Spain', code: 'ES'},
          {name: 'Sri Lanka', code: 'LK'},
          {name: 'Sudan', code: 'SD'},
          {name: 'Suriname', code: 'SR'},
          {name: 'Svalbard and Jan Mayen', code: 'SJ'},
          {name: 'Swaziland', code: 'SZ'},
          {name: 'Sweden', code: 'SE'},
          {name: 'Switzerland', code: 'CH'},
          {name: 'Syrian Arab Republic', code: 'SY'},
          {name: 'Taiwan, Province of China', code: 'TW'},
          {name: 'Tajikistan', code: 'TJ'},
          {name: 'Tanzania, United Republic of', code: 'TZ'},
          {name: 'Thailand', code: 'TH'},
          {name: 'Timor-Leste', code: 'TL'},
          {name: 'Togo', code: 'TG'},
          {name: 'Tokelau', code: 'TK'},
          {name: 'Tonga', code: 'TO'},
          {name: 'Trinidad and Tobago', code: 'TT'},
          {name: 'Tunisia', code: 'TN'},
          {name: 'Turkey', code: 'TR'},
          {name: 'Turkmenistan', code: 'TM'},
          {name: 'Turks and Caicos Islands', code: 'TC'},
          {name: 'Tuvalu', code: 'TV'},
          {name: 'Uganda', code: 'UG'},
          {name: 'Ukraine', code: 'UA'},
          {name: 'United Arab Emirates', code: 'AE'},
          {name: 'United Kingdom', code: 'GB'},
          {name: 'United States', code: 'US'},
          {name: 'United States Minor Outlying Islands', code: 'UM'},
          {name: 'Uruguay', code: 'UY'},
          {name: 'Uzbekistan', code: 'UZ'},
          {name: 'Vanuatu', code: 'VU'},
          {name: 'Venezuela', code: 'VE'},
          {name: 'Viet Nam', code: 'VN'},
          {name: 'Virgin Islands, British', code: 'VG'},
          {name: 'Virgin Islands, U.S.', code: 'VI'},
          {name: 'Wallis and Futuna', code: 'WF'},
          {name: 'Western Sahara', code: 'EH'},
          {name: 'Yemen', code: 'YE'},
          {name: 'Zambia', code: 'ZM'},
          {name: 'Zimbabwe', code: 'ZW'}
        ]
      }
    },
    components: {
    },
    methods: {
      getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      },

      async addPlayer () {
        console.log("addPlayer");
        await PlayersService.addPlayer({
          name_first: this.name_first,
          name_last: this.name_last,
          gender: this.gender,
          age: this.getAge(this.birth_date),
          birth_date: this.birth_date,
          nationality: this.nationality,
          presentation: this.presentation,
          join_date: Date.now(),
          positions: this.positions,
          toefl_score: this.toefl_score,
          sat_score: this.sat_score,
          act_score: this.act_score,
          cm: this.cm,
          kg: this.kg,
          phone_number: this.phone_number,
          email: this.email,
          skype: this.skype
        });
        this.$swal(
          'Great!',
          `Your player has been added!`,
          'success'
        );
        this.$router.push({ name: 'Players' })
      }
    }
  }
</script>
<style scoped>

  /*

  .form input, .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }
  .form div {
    margin: 20px;
  }
  .app_player_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
  }


   */


</style>

