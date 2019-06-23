<template>
    <div>
        <v-container>
            <v-layout>
                <v-flex xs30>
                    <v-layout row wrap>
                        <v-flex xs14 sm10>
                        <v-text-field
                        solo-inverted
                        flat
                        hide-details
                        label="Search"
                        prepend-inner-icon="search"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs14 sm2>
                        <v-menu
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                        >
                            <v-btn slot="activator" >
                            <v-icon left>expand_more</v-icon>
                            <span>Filtros</span>
                            </v-btn>
                            <v-card>
                                <v-card-text>
                                        <v-layout row>
                                            <p>Preço</p>
                                            <v-flex shrink style="width: 41px">
                                            <v-text-field
                                                v-model="value3[0]"
                                                class="mt-0"
                                                hide-details
                                                single-line
                                                type="number"
                                            ></v-text-field>
                                            </v-flex>

                                            <v-flex class="px-3">
                                            <v-range-slider
                                                style="width: 200px"
                                                v-model="value3"
                                                :max="10000"
                                                :min="200"
                                                :step="10"
                                            ></v-range-slider>
                                            </v-flex>

                                            <v-flex shrink style="width: 60px">
                                            <v-text-field
                                                v-model="value3[1]"
                                                class="mt-0"
                                                hide-details
                                                single-line
                                                type="number"
                                            ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <p>Cidade</p>
                                            <v-autocomplete
                                                v-model="model"
                                                :items="cidades"
                                                persistent-hint
                                                prepend-icon="mdi-city"
                                            >
                                                <template v-slot:append-outer>
                                                <v-slide-x-reverse-transition
                                                    mode="out-in"
                                                >
                                                </v-slide-x-reverse-transition>
                                                </template>
                                            </v-autocomplete>
                                        </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-menu>
                        </v-flex>
                    </v-layout>
                    <br><br>
                    <v-layout row wrap>
                        <v-flex xs24 sm3   v-for="ap in apartamentos">
                            <v-card width="230px" height="250px">
                                <v-img
                                class="white--text"
                                height="130px"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline">{{ap.title}}</span>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                                </v-img>
                                <v-card-title>
                                <div>
                                    <span class="grey--text"><v-icon v-for="i in ap.stars" color="amber" flat>star</v-icon></span><br>
                                    <span>{{ap.preco}}</span><br>
                                    <span>{{ap.cidade}}</span><br>
                                    <div align="right" style="margin-right: -110px;">
                                        <span><v-icon flat>share</v-icon></span>
                                    </div>
                                </div>  
                                </v-card-title>

                            </v-card>
                    </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        apartamentos: [
            { title: 'AP 4 QUARTOS', preco: 'R$400,00', cidade: 'Belo Horizonte', stars: 3},
            { title: 'AP 2 QUARTOS', preco: 'R$300,00', cidade: 'Viçosa', stars: 4},
            { title: 'Kitnet', preco: 'R$529,90', cidade: 'Araxa', stars: 5},
            { title: 'Kitnet', preco: 'R$529,90', cidade: 'Araxa', stars: 5}
        ],
        value3: [300, 2000],
        cidades: require('./cidades.json').mg_city_list
    }),
    props: {
        filtro: {
            default: ''
        }
    },
    mounted() {
        console.log(this.filtro);
    },
}
</script>

<style>

</style>
